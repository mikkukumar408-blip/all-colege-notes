import glob
import re

files = sorted(glob.glob('client/src/data/*NotesData.js'))

for f in files:
    with open(f, 'r', encoding='utf-8') as fp:
        content = fp.read()
    
    orig_content = content
    
    # 1. Replace height=\"auto\" or height="auto" on svg with style="height:auto;" or simply remove height="auto" if style has it
    # <svg ... height=\"auto\" ...> -> <svg ... style=\"height:auto;\" ...>
    content = content.replace('height=\\"auto\\"', 'style=\\"height:auto;\\"')
    content = content.replace('height="auto"', 'style="height:auto;"')
    
    # 2. Fix KaTeX matrices/cases/aligned row breaks
    # In JS files, triple backslash before space `\\\ ` or newline `\\\n` or `\\\ `
    # Replace `\\\ ` with `\\\\ ` (which at JS parse time gives \\ instead of \)
    # We specifically target `\\\ `
    content = content.replace('\\\\\\ ', '\\\\\\\\ ')
    content = content.replace('\\\\\\n', '\\\\\\\\n')
    
    if content != orig_content:
        with open(f, 'w', encoding='utf-8') as fp:
            fp.write(content)
        print(f"Updated {f}")
    else:
        print(f"No changes for {f}")
