# SOC Home Lab — Evidence Publishing Guide

This guide matches the sections on [SOC Home Lab](https://yveszamor21.github.io/soc-home-lab.html). **Do not label evidence complete before it exists.**

## Directory structure
```text
assets/images/soc-lab/
  01-ubuntu-ssh-status.png
  02-network-baseline.png
  03-ssh-authentication-events.png
  04-python-detector-alert.png
  05-investigation-timeline.png
evidence/soc-lab/
  01-architecture.md
  02-ssh-investigation.md
  03-detector-validation.md
```
Create folders as you add actual files; filenames above are a plan, not a claim they exist.

## Evidence mapping
| Website section | File to upload | What it proves |
| --- | --- | --- |
| Lab architecture | 01-ubuntu-ssh-status.png, 01-architecture.md | Ubuntu version, SSH service and lab boundaries |
| Lab architecture | 02-network-baseline.png | Network baseline with sensitive details redacted |
| Authentication evidence | 03-ssh-authentication-events.png, 02-ssh-investigation.md | Failed/successful login observations and timeline |
| Python detector | 04-python-detector-alert.png, 03-detector-validation.md | Script output, tested threshold and matching logs |
| Investigation | 05-investigation-timeline.png | Evidence-to-conclusion reasoning |

## Report template
**Title:**  
**Date (timezone):**  
**Objective:**  
**Scope and authorization:** Personal isolated lab only.  
**Environment:** OS, VM, SSH version and relevant tools.  
**Steps / commands:**  
**Evidence:** Relative paths to sanitized screenshots and logs.  
**Observed results:** Distinguish facts from assumptions.  
**Analysis:** What the events mean and what they do not prove.  
**Limitations / false positives:**  
**Next steps:**  

## Safe publishing checklist
- [ ] Remove passwords, private keys, tokens and credentials.
- [ ] Remove personal identifiers, unrelated user names and employer data.
- [ ] Redact network identifiers when appropriate.
- [ ] Confirm screenshots match the documented command and event.
- [ ] Check dates and time zones; avoid unsupported claims.
- [ ] Update the website from Pending to Published only after reviewing the files.
