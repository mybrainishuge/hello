# Contributing

## General Workflow

1. Fork the repo.
2. Cut a namespaced feature branch from master named appropriate to the issue being addressed.
3. Make commits to your feature branch.
4. When finished with fix or feature, rebase upstream changes into your branch and push to your fork.
5. Submit a [pull request][] directly to the `Dev` branch.  Include a description of your changes.
6. Your pull request must be reviewed by another contributor before being merged.
7. Fix any issues raised by the code reviewer and push fixes as a single new commit.
8. Once the pull request has been reviewed, it will be merged by another member of the team.  Do not merge your own commits.

## Detailed Workflow

### Fork the repo

1. Use GitHub’s interface to make a fork of the repo to your personal account.
2. Clone the repo from your fork to your local machine.
3. Add the original repo as an upstream remote:

   ```
   git remote add upstream https://github.com/digi-talk/hello.git
   ```

### Cut a namespaced feature branch from master

1. Name the branch appropriate to the issue being addressed.  For example,
   if implementing authentication, the branch might be named `auth`:

   ```bash
   # Creates your branch and brings you there
   git checkout -b `your-branch-name`
   ```

### Make commits to your feature branch.

1. Prefix the commit subject with the commit type in parens.
2. Type a brief subject in present tense.
3. Suffix with the GitHub Issue number in brackets.
  - (feat) Add session store [#14]
  - (fix) Fix inconsistent tests [#19]
  - (refactor) ...
  - (cleanup) ...
  - (test) ...
  - (doc) ...

Make changes and commits on your branch that are relevant only to this branch.  Unrelated changes should occur on separate branches.

#### Commit Message Guidelines

- Write commit messages in the present tense; e.g. "Add session store".
- The first line of should be a brief summary of what the commit changes within about 60 characters.
- Following the first line should be a blank line and then a more detailed description as necessary with each line wrapping at around 75 characters.

### Rebase upstream changes into your branch

Once done making changes, you can begin the process of getting your code merged into the main repo.
1. Commit all changes and then rebase upstream changes from the master branch into yours by running the following command from your branch:

```bash
git pull --rebase upstream master
```

This will start the rebase process.  All of your changes must be commited before doing this.  If there are no conflicts, this will roll all of your changes back on top of the changes from upstream, leading to a clean, linear commit history.

If there are conflicts, git will complain during the rebasing process.  Git will pause rebasing to allow you to address the conflicts.  Git will list which files contain conflicts.  Open the conflicting files using a text editor like Sublime and pick the versions you want.  A conflict will look like the following:

```
<<<<<<< HEAD
some conflicting code
============
some other conflicting code
>>>>>>> master
```

2. Choose the code you want to keep and delete the code you don't along with the <<<, ===, and >>> markings.  Save the file and `git add` it to be staged.  No commits are made during a rebase.
3. Once done fixing conflicts for a specific commit, run:

```bash
git rebase --continue
```

4. This resumes the rebasing process.  Once all conflicts are resolved, run tests to confirm nothing is broken.
5. If rebasing broke anything, fix it, then repeat the above process until nothing is broken and all the tests pass.

### Make a pull request

Make a pull request from your fork and branch to the upstream Dev branch, detailing exactly what changes you made and following the PR checklist below.

1. [ ] Rebased from upstream
2. [ ] Confirmed existing tests pass
3. [ ] Added new tests as necessary
4. [ ] Commented code where necessary
5. [ ] Updated relevant documentation
6. [ ] Purged debugging console logs and debuggers

At least one other person MUST perform a code review of your PR.  They will either merge your changes into upstream or request changes.  If changes are requested, make more commits to your branch to fix these, then follow this process again from rebasing onwards.

Once you get back here, make a comment requesting further review and someone will look at your code again.  If they like it, it will get merged, else, just repeat again.

### Guidelines

1. Keep your code [DRY][].
2. Follow [STYLE-GUIDE.md](STYLE-GUIDE.md)
3. Run [tests][] before submitting a pull request.
4. Submit tests if your pull request contains new, testable behavior.

## Checklist:

This is just to help you organize your process

- [ ] Did I cut my work branch off of master (don't cut new branches from existing feature brances)?
- [ ] Did I follow an appropriate naming convention for my branch?
- [ ] Is my branch focused on a single main change?
- [ ] Do all of my changes directly relate to this change?
- [ ] Did I rebase the upstream master branch after I finished all my work?
- [ ] Did I write a clear pull request message detailing what changes I made?
- [ ] Did I get a code review?
- [ ] Did I make any requested changes from that code review?

If you follow all of these guidelines and make good changes, you should have no problem getting your changes merged in.


<!-- Links -->
[style guide]: https://github.com/hackreactor-labs/style-guide
[curriculum workflow diagram]: http://i.imgur.com/p0e4tQK.png
[cons of merge]: https://f.cloud.github.com/assets/1577682/1458274/1391ac28-435e-11e3-88b6-69c85029c978.png
[tools workflow diagram]: http://i.imgur.com/kzlrDj7.png
[Git Flow]: http://nvie.com/posts/a-successful-git-branching-model/
[GitHub Flow]: http://scottchacon.com/2011/08/31/github-flow.html
[Squash]: http://gitready.com/advanced/2009/02/10/squashing-commits-with-rebase.html
