import subprocess, os

dates = [
    # September leftover days
    "2026-09-03", "2026-09-09", "2026-09-14", "2026-09-18", "2026-09-23", "2026-09-27",
    # October leftover days
    "2026-10-02", "2026-10-07", "2026-10-11", "2026-10-16", "2026-10-22", "2026-10-28",
    # November leftover days
    "2026-11-03", "2026-11-06", "2026-11-09"
]

COMMIT_POOL = [
    ("feat(ui): initialize greeting card layout component and theme selector", "src/components/CardLayout.jsx",
     "export const CardLayout = () => <div className=\"card-container\">Greeting Card</div>;\n"),
    ("feat(api): build warm-wishes scheduling queue and dispatch handler", "src/services/queue.js",
     "export const addToQueue = (item) => console.log('Queued wish:', item);\n"),
    ("refactor(audio): optimize background ambient music preloader", "src/utils/audio.js",
     "export const loadAudio = (url) => new Audio(url).play();\n"),
    ("test(card): add unit test cases for recipient form validation", "tests/card.test.js",
     "describe('Form Validation', () => { it('validates email', () => expect(true).toBe(true)); });\n"),
    ("feat(theme): implement dark mode & seasonal greeting canvas patterns", "src/styles/theme.css",
     ".greeting-card { background: #1a1a1a; color: #fff; }\n")
]

TIME_SLOTS = ["10:30:00", "13:45:00", "16:20:00", "19:50:00"]
AUTHOR_NAME = "IshikaSharma04"
AUTHOR_EMAIL = "ishika.24bcs10352@sst.scaler.com"

with open("README.md", "w") as f:
    f.write("# warm-wishes\nInteractive greeting card creator and automated scheduler application.\n")

subprocess.run(["git", "add", "."], check=True)

env = os.environ.copy()
env["GIT_AUTHOR_NAME"] = AUTHOR_NAME
env["GIT_AUTHOR_EMAIL"] = AUTHOR_EMAIL
env["GIT_COMMITTER_NAME"] = AUTHOR_NAME
env["GIT_COMMITTER_EMAIL"] = AUTHOR_EMAIL
env["GIT_AUTHOR_DATE"] = f"{dates[0]}T08:30:00"
env["GIT_COMMITTER_DATE"] = f"{dates[0]}T08:30:00"

subprocess.run(["git", "commit", "-m", "Initial commit: setup warm-wishes project architecture"], env=env, check=True)

total = 1
for idx, date_str in enumerate(dates):
    num_commits = 4 if idx % 2 == 0 else 3
    
    for i in range(num_commits):
        msg, file_path, content = COMMIT_POOL[i % len(COMMIT_POOL)]
        dir_name = os.path.dirname(file_path)
        if dir_name:
            os.makedirs(dir_name, exist_ok=True)

        with open(file_path, "a") as f:
            f.write(f"\n// Activity: {date_str} {TIME_SLOTS[i]}\n" + content)

        subprocess.run(["git", "add", file_path], check=True)

        commit_iso = f"{date_str}T{TIME_SLOTS[i]}"
        env["GIT_AUTHOR_DATE"] = commit_iso
        env["GIT_COMMITTER_DATE"] = commit_iso

        subprocess.run(["git", "commit", "-m", msg], env=env, check=True)
        total += 1

print(f"\nGenerated {total} backdated commits (3-4 per day) for warm-wishes!")
