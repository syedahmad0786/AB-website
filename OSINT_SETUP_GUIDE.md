# OSINT Technical Setup Guide

This file contains the commands to install and run deep-search OSINT tools.

## Prerequisites

Before running these, ensure your environment has the basics:

```bash
sudo apt update && sudo apt install -y git python3 python3-pip curl
```

---

## 1. Identity & Username Research

### Maigret (The Sherlock Successor)

Recursively searches for usernames and generates a dossier.

**Install:**

```bash
pip3 install maigret
```

**Run:**

```bash
maigret [username] --html-report
```

### Blackbird (Fast & Stealthy)

Searches 500+ sites including niche/alternative platforms.

**Install:**

```bash
git clone https://github.com/p1ngul1n0/blackbird
cd blackbird && pip3 install -r requirements.txt
```

**Run:**

```bash
python3 blackbird.py --username [username]
```

---

## 2. Email Intelligence

### GHunt (Google Account Recon)

Extracts Google ID, YouTube, Maps reviews, and public data from a Gmail.

**Install:**

```bash
git clone https://github.com/mxrch/ghunt
cd ghunt && pip3 install .
```

**Login (Required):**

```bash
ghunt login  # Follow prompts to paste browser cookies
```

**Run:**

```bash
ghunt email [target@gmail.com]
```

### Holehe (Account Checker)

Checks which sites (Instagram, Twitter, etc.) an email is registered on.

**Install:**

```bash
pip3 install holehe
```

**Run:**

```bash
holehe [email@domain.com]
```

---

## 3. Phone Number Recon

### PhoneInfoga (Carrier & Footprint)

Advanced scanner for phone numbers using Google Dorks and carrier data.

**Install:**

```bash
curl -sSL https://raw.githubusercontent.com/sundowndev/phoneinfoga/master/support/install | bash
```

**Run (UI Mode):**

```bash
./phoneinfoga serve -p 8080
```

### Ignorant (Social Media Linkage)

Checks if a phone number is linked to Snapchat, Amazon, or Instagram.

**Install:**

```bash
git clone https://github.com/megadose/ignorant
cd ignorant && pip3 install -r requirements.txt
```

**Run:**

```bash
python3 ignorant.py --phone [number] --country [code]
```

---

## 4. Heavyweight Frameworks

### SpiderFoot (Automation Beast)

Integrates 200+ sources (Dark Web, leaks, social) into one scan.

**Install:**

```bash
git clone https://github.com/smicallef/spiderfoot.git
cd spiderfoot && pip3 install -r requirements.txt
```

**Run (Web Interface):**

```bash
python3 sf.py -l 127.0.0.1:5001
```

---

## Recommended Security Workflow

**Stage 1:** Run `holehe` on the email to see where they are active.

**Stage 2:** Run `maigret` on the username found to build a social map.

**Stage 3:** If it's a Gmail, use `ghunt` to get locational data from Maps reviews.

**Stage 4:** Use `phoneinfoga` to verify the carrier and web presence of any numbers found.
