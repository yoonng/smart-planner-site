from pathlib import Path
from PIL import Image

root = Path('.')
source = root / 'assets/user-guide/en/focus/focus-timer-flow.webp'
target = root / 'assets/user-guide/en/focus/focus-timer-flow.png'
html_path = root / 'smart-planner/user-guide.html'

if not source.exists():
    raise SystemExit(f'Missing source image: {source}')

with Image.open(source) as image:
    image.load()
    print(f'Validated source: format={image.format}, size={image.size}, mode={image.mode}')
    if image.mode not in ('RGB', 'RGBA'):
        image = image.convert('RGBA')
    image.save(target, format='PNG', optimize=True)

with Image.open(target) as converted:
    converted.verify()
print(f'Created valid PNG: {target} ({target.stat().st_size} bytes)')

html = html_path.read_text(encoding='utf-8')
old = '/assets/user-guide/en/focus/focus-timer-flow.webp'
new = '/assets/user-guide/en/focus/focus-timer-flow.png'
if old not in html:
    raise SystemExit(f'Expected image reference not found: {old}')
html_path.write_text(html.replace(old, new), encoding='utf-8')

source.unlink()

# Remove an abandoned chunked-upload attempt if it exists.
tmp_dir = root / '.tmp/focus-jpg'
if tmp_dir.exists():
    for child in tmp_dir.iterdir():
        child.unlink()
    tmp_dir.rmdir()

print('Updated HTML reference and removed the WebP source.')
