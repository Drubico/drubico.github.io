#!/usr/bin/env python3
"""
python s:\Proyects\portfolio\scripts\convert_to_webp.py; Get-ChildItem 'S:\Proyects\portfolio\assets\images' | Select-Object Name, Length | Format-Table -AutoSize


Convierte PNG/JPG/JPEG en la carpeta assets/images a WebP con calidad configurable.
Uso: python scripts/convert_to_webp.py
"""
import sys
from pathlib import Path

try:
    from PIL import Image
except Exception as e:
    print('MISSING_PIL')
    print(e)
    sys.exit(2)

ROOT = Path(__file__).resolve().parents[1]
IMG_DIR = ROOT / 'assets' / 'images'
QUALITY = 85
SKIP_EXISTING = True
# Si True, borra el archivo original (.png/.jpg/.jpeg) después de crear el .webp
REMOVE_ORIGINALS = True

if not IMG_DIR.exists():
    print('IMG_DIR_NOT_FOUND', IMG_DIR)
    sys.exit(1)

converted = 0
skipped = 0
errors = 0
for p in sorted(IMG_DIR.glob('*')):
    if p.suffix.lower() in ['.png', '.jpg', '.jpeg']:
        out = p.with_suffix('.webp')
        if SKIP_EXISTING and out.exists():
            # Si el webp ya existe y queremos borrar los originales, elimínalo
            if REMOVE_ORIGINALS and p.exists():
                try:
                    p.unlink()
                    converted += 0
                    skipped += 1
                    print(f'DELETED_ORIGINAL (webp exists): {p.name}')
                except Exception as e:
                    errors += 1
                    print(f'ERROR_DELETE: {p.name} -> {e}')
            else:
                skipped += 1
                print(f'SKIP (exists): {out.name}')
            continue
        try:
            img = Image.open(p)
            # Convert RGBA to RGB with white background to avoid alpha issues in lossy webp
            if img.mode in ('RGBA', 'LA'):
                background = Image.new('RGB', img.size, (255,255,255))
                background.paste(img, mask=img.split()[-1])
                img = background
            elif img.mode != 'RGB':
                img = img.convert('RGB')
            img.save(out, 'WEBP', quality=QUALITY, method=6)
            converted += 1
            print(f'CONVERTED: {p.name} -> {out.name} ({out.stat().st_size} bytes)')
            if REMOVE_ORIGINALS:
                try:
                    p.unlink()
                    print(f'DELETED_ORIGINAL: {p.name}')
                except Exception as e:
                    errors += 1
                    print(f'ERROR_DELETE: {p.name} -> {e}')
        except Exception as e:
            errors += 1
            print(f'ERROR: {p.name} -> {e}')

print('---')
print(f'Converted: {converted}, Skipped: {skipped}, Errors: {errors}')
