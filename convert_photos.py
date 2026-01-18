import os
from pathlib import Path
from pillow_heif import register_heif_opener
from PIL import Image

register_heif_opener()

source_dir = Path("photos/Greg")
output_dir = Path("photos/jpg")
output_dir.mkdir(exist_ok=True)

for i, heic_file in enumerate(sorted(source_dir.glob("*.HEIC"))):
    print(f"Converting {heic_file.name}...")
    img = Image.open(heic_file)
    # Resize for web (max 1200px width)
    if img.width > 1200:
        ratio = 1200 / img.width
        new_size = (1200, int(img.height * ratio))
        img = img.resize(new_size, Image.LANCZOS)
    output_path = output_dir / f"gregory_{i+1:02d}.jpg"
    img.save(output_path, "JPEG", quality=85)
    print(f"  -> Saved as {output_path}")

print(f"\nDone! Converted {len(list(output_dir.glob('*.jpg')))} photos.")
