import argparse
from subprocess import run


def parse():
    parser = argparse.ArgumentParser()
    parser.add_argument('sha', type=str)

    args = parser.parse_args()
    sha = args.sha

    return sha


def main():
    sha = parse()
    git_dir = "/tmp/get_git_sha/.git"
    run(f"/opt/git --git-dir {git_dir} rev-parse --short {sha}".split(" "))


if __name__ == "__main__":
    main()
