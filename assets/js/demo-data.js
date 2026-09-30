/* Recorded output from two shipped pipelines, folded into one plain script.
 *
 * Nothing here is written by hand. Every figure was produced by running the
 * projects' own code against their own published sample corpora:
 *
 *   VIN_VLM                  the notebook's real OCR + validation helpers,
 *                            run over the six synthetic rendered plates.
 *                            (The trained segmentation model is private, so
 *                            the plate box comes from Otsu thresholding; the
 *                            field below records which method each used.)
 *   Retention_admin_automate  the per-call transcript records as written by
 *                            the pipeline, plus WER and CER computed with
 *                            data_store.py's own functions so this page can
 *                            never quote a different number than the tool.
 *
 * The plates are drawn renders, not photographs, and every VIN carries a SYN
 * prefix so it cannot collide with a real vehicle. The calls are fabricated
 * and agent identities are anonymous voice-cluster ids, never names.
 */
window.CULT_DEMO = {
 "vin": {
  "source": "VIN_VLM",
  "plates": [
   {
    "id": "T00001",
    "pose": "clean, straight-on",
    "img": "assets/img/plates/T00001.jpg",
    "w": 650,
    "h": 234,
    "boxPct": [
     0.0262,
     0.0726,
     0.9754,
     0.9316
    ],
    "boxMethod": "otsu",
    "imageQuality": "blurry,blown_out",
    "crop": {
     "w": 647,
     "h": 231,
     "brenner": 0.0443,
     "blurVar": 262.0,
     "strokeContrast": 201.2,
     "quality": "ok"
    },
    "lines": [
     {
      "text": "VIN",
      "conf": 0.9999
     },
     {
      "text": "SYN1A2B3C4D5E6F78",
      "conf": 1.0
     }
    ],
    "selected": "SYN1A2B3C4D5E6F78",
    "selectedConf": 1.0,
    "selectionReason": "layout",
    "cleaned": "SYN1A2B3C4D5E6F78",
    "candidates": 1,
    "final": "SYN1A2B3C4D5E6F78",
    "ok": true,
    "reason": "Valid",
    "recorded": "SYN1A2B3C4D5E6F78",
    "match": true
   },
   {
    "id": "T00002",
    "pose": "slight rotation",
    "img": "assets/img/plates/T00002.jpg",
    "w": 650,
    "h": 228,
    "boxPct": [
     0.0262,
     0.0702,
     0.9754,
     0.9342
    ],
    "boxMethod": "otsu",
    "imageQuality": "blurry",
    "crop": {
     "w": 647,
     "h": 227,
     "brenner": 0.0429,
     "blurVar": 149.1,
     "strokeContrast": 184.0,
     "quality": "ok"
    },
    "lines": [
     {
      "text": "VIN",
      "conf": 0.9999
     },
     {
      "text": "SYN9Z8Y7X6W5V4T32",
      "conf": 1.0
     }
    ],
    "selected": "SYN9Z8Y7X6W5V4T32",
    "selectedConf": 1.0,
    "selectionReason": "layout",
    "cleaned": "SYN9Z8Y7X6W5V4T32",
    "candidates": 1,
    "final": "SYN9Z8Y7X6W5V4T32",
    "ok": true,
    "reason": "Valid",
    "recorded": "SYN9Z8Y7X6W5V4T32",
    "match": true
   },
   {
    "id": "T00003",
    "pose": "tilted, soft focus",
    "img": "assets/img/plates/T00003.jpg",
    "w": 662,
    "h": 288,
    "boxPct": [
     0.0272,
     0.066,
     0.9728,
     0.9375
    ],
    "boxMethod": "otsu",
    "imageQuality": "blurry",
    "crop": {
     "w": 656,
     "h": 281,
     "brenner": 0.0148,
     "blurVar": 13.8,
     "strokeContrast": 154.8,
     "quality": "blurry"
    },
    "lines": [
     {
      "text": "VIN",
      "conf": 0.9997
     },
     {
      "text": "SYN3M4N5P6R7S8T91",
      "conf": 1.0
     }
    ],
    "selected": "SYN3M4N5P6R7S8T91",
    "selectedConf": 1.0,
    "selectionReason": "layout",
    "cleaned": "SYN3M4N5P6R7S8T91",
    "candidates": 1,
    "final": "SYN3M4N5P6R7S8T91",
    "ok": true,
    "reason": "Valid",
    "recorded": "SYN3M4N5P6R7S8T91",
    "match": true
   },
   {
    "id": "T00004",
    "pose": "out of focus",
    "img": "assets/img/plates/T00004.jpg",
    "w": 640,
    "h": 200,
    "boxPct": [
     0.0234,
     0.075,
     0.9781,
     0.93
    ],
    "boxMethod": "otsu",
    "imageQuality": "blurry",
    "crop": {
     "w": 640,
     "h": 200,
     "brenner": 0.0156,
     "blurVar": 6.3,
     "strokeContrast": 110.8,
     "quality": "blurry"
    },
    "lines": [
     {
      "text": "VIN",
      "conf": 0.9999
     },
     {
      "text": "SYN7K8L9M1N2P3R45",
      "conf": 1.0
     }
    ],
    "selected": "SYN7K8L9M1N2P3R45",
    "selectedConf": 1.0,
    "selectionReason": "layout",
    "cleaned": "SYN7K8L9M1N2P3R45",
    "candidates": 1,
    "final": "SYN7K8L9M1N2P3R45",
    "ok": true,
    "reason": "Valid",
    "recorded": "SYN7K8L9M1N2P3R45",
    "match": true
   },
   {
    "id": "T00005",
    "pose": "heavily skewed",
    "img": "assets/img/plates/T00005.jpg",
    "w": 668,
    "h": 330,
    "boxPct": [
     0.0299,
     0.0606,
     0.9716,
     0.9424
    ],
    "boxMethod": "otsu",
    "imageQuality": "blurry",
    "crop": {
     "w": 659,
     "h": 321,
     "brenner": 0.0177,
     "blurVar": 28.5,
     "strokeContrast": 171.0,
     "quality": "blurry"
    },
    "lines": [
     {
      "text": "VIN",
      "conf": 0.9998
     },
     {
      "text": "SYN5T6V7W8X9Y1Z23",
      "conf": 0.9999
     }
    ],
    "selected": "SYN5T6V7W8X9Y1Z23",
    "selectedConf": 0.9999,
    "selectionReason": "layout",
    "cleaned": "SYN5T6V7W8X9Y1Z23",
    "candidates": 1,
    "final": "SYN5T6V7W8X9Y1Z23",
    "ok": true,
    "reason": "Valid",
    "recorded": "SYN5T6V7W8X9Y1Z23",
    "match": true
   },
   {
    "id": "T00006",
    "pose": "very dim",
    "img": "assets/img/plates/T00006.jpg",
    "w": 640,
    "h": 200,
    "boxPct": [
     0.0234,
     0.075,
     0.9781,
     0.93
    ],
    "boxMethod": "otsu",
    "imageQuality": "blurry",
    "crop": {
     "w": 640,
     "h": 200,
     "brenner": 0.0701,
     "blurVar": 89.9,
     "strokeContrast": 88.4,
     "quality": "ok"
    },
    "lines": [
     {
      "text": "VIN",
      "conf": 0.9999
     },
     {
      "text": "SYN2B3C4D5E6F7G89",
      "conf": 0.9999
     }
    ],
    "selected": "SYN2B3C4D5E6F7G89",
    "selectedConf": 0.9999,
    "selectionReason": "layout",
    "cleaned": "SYN2B3C4D5E6F7G89",
    "candidates": 1,
    "final": "SYN2B3C4D5E6F7G89",
    "ok": true,
    "reason": "Valid",
    "recorded": "SYN2B3C4D5E6F7G89",
    "match": true
   }
  ],
  "correction": {
   "input": "SYNIA2B3C4D5E6F78",
   "corrected": "SYN1A2B3C4D5E6F78",
   "ok": true,
   "reason": "Valid (auto-corrected from SYNIA2B3C4D5E6F78)",
   "steps": [
    {
     "input": "SYNIA2B3C4D5E6F78",
     "result": "Valid (auto-corrected from SYNIA2B3C4D5E6F78)"
    },
    {
     "input": "SYN1A2B3C4D5E6F7",
     "result": "Wrong length: 16 chars (must be 17)"
    },
    {
     "input": "SYN1A2B3C4D5E6F7I",
     "result": "Contains banned letter I, O, or Q"
    },
    {
     "input": "syn 1a2b-3c4d",
     "result": "cleaned to SYN1A2B3C4D"
    }
   ]
  },
  "wmi": {
   "JTD": "Toyota",
   "JTE": "Toyota",
   "JTF": "Toyota",
   "JTG": "Toyota",
   "JTH": "Toyota",
   "JTJ": "Toyota",
   "JTK": "Toyota",
   "JTL": "Toyota",
   "JTM": "Toyota",
   "JTN": "Toyota",
   "AHT": "Toyota",
   "4T1": "Toyota",
   "5TD": "Toyota",
   "6T1": "Toyota",
   "LFM": "Toyota",
   "LTV": "Toyota",
   "LVG": "Toyota",
   "SB1": "Toyota",
   "TW1": "Toyota",
   "2T2": "Lexus",
   "114": "Acura",
   "19U": "Acura",
   "JH4": "Acura",
   "2HH": "Acura",
   "JN8": "Infiniti",
   "JNK": "Infiniti",
   "5N1": "Infiniti",
   "1FA": "Ford",
   "1FB": "Ford",
   "1FC": "Ford",
   "1FD": "Ford",
   "1FM": "Ford",
   "1FT": "Ford",
   "2FA": "Ford",
   "3FA": "Ford",
   "AFA": "Ford",
   "MNB": "Ford",
   "WF0": "Ford",
   "NM0": "Ford",
   "8AF": "Ford",
   "9BF": "Ford",
   "1LN": "Lincoln",
   "5L1": "Lincoln",
   "WVW": "Volkswagen",
   "WV1": "Volkswagen",
   "WV2": "Volkswagen",
   "WV3": "Volkswagen",
   "AAV": "Volkswagen",
   "3VW": "Volkswagen",
   "9BW": "Volkswagen",
   "1VW": "Volkswagen",
   "WVG": "Volkswagen",
   "XW8": "Volkswagen",
   "8AW": "Volkswagen",
   "WAU": "Audi",
   "WA1": "Audi",
   "TRU": "Audi",
   "93U": "Audi",
   "AAA": "Audi",
   "99A": "Audi",
   "TMB": "Skoda",
   "VSS": "Seat",
   "WP0": "Porsche",
   "WP1": "Porsche",
   "WBA": "BMW",
   "WBS": "BMW",
   "WBX": "BMW",
   "WBY": "BMW",
   "4US": "BMW",
   "5UX": "BMW",
   "MMF": "BMW",
   "ABM": "BMW",
   "LBV": "BMW",
   "WMW": "Mini",
   "WDB": "Mercedes-Benz",
   "WDC": "Mercedes-Benz",
   "WDD": "Mercedes-Benz",
   "WDF": "Mercedes-Benz",
   "4JG": "Mercedes-Benz",
   "55S": "Mercedes-Benz",
   "ADB": "Mercedes-Benz",
   "LE4": "Mercedes-Benz",
   "WME": "Smart",
   "W0L": "Opel",
   "W0V": "Opel",
   "S1U": "Opel",
   "KMH": "Hyundai",
   "AC5": "Hyundai",
   "ADD": "Hyundai",
   "TMA": "Hyundai",
   "95P": "Hyundai",
   "LBE": "Hyundai",
   "KNA": "Kia",
   "KND": "Kia",
   "U5Y": "Kia",
   "LJD": "Kia",
   "KPA": "SsangYong",
   "KPT": "SsangYong",
   "KL1": "Daewoo",
   "JN1": "Nissan",
   "JN6": "Nissan",
   "1N4": "Nissan",
   "3N1": "Nissan",
   "VSK": "Nissan",
   "SJN": "Nissan",
   "ADN": "Nissan",
   "LGB": "Nissan",
   "JHM": "Honda",
   "1HG": "Honda",
   "2HG": "Honda",
   "SHH": "Honda",
   "MRH": "Honda",
   "AHM": "Honda",
   "LHG": "Honda",
   "JM1": "Mazda",
   "JM3": "Mazda",
   "JMZ": "Mazda",
   "YCM": "Mazda",
   "4F2": "Mazda",
   "AFB": "Mazda",
   "JA3": "Mitsubishi",
   "JA4": "Mitsubishi",
   "JMB": "Mitsubishi",
   "JL5": "Mitsubishi",
   "ABJ": "Mitsubishi",
   "JSA": "Suzuki",
   "JSK": "Suzuki",
   "TSM": "Suzuki",
   "MH8": "Suzuki",
   "VSE": "Suzuki",
   "MA3": "Suzuki",
   "JAA": "Isuzu",
   "JAL": "Isuzu",
   "MPA": "Isuzu",
   "ACV": "Isuzu",
   "ADM": "Isuzu",
   "JF1": "Subaru",
   "JF2": "Subaru",
   "4S3": "Subaru",
   "4S4": "Subaru",
   "JDA": "Daihatsu",
   "MHK": "Daihatsu",
   "YV1": "Volvo",
   "YV4": "Volvo",
   "LYV": "Volvo",
   "LPS": "Polestar",
   "YS3": "Saab",
   "SAL": "Land Rover",
   "SAB": "Land Rover",
   "L2C": "Land Rover",
   "SAJ": "Jaguar",
   "VF3": "Peugeot",
   "VR3": "Peugeot",
   "LDC": "Peugeot",
   "VF7": "Citroen",
   "VS7": "Citroen",
   "8BC": "Citroen",
   "935": "Citroen",
   "VF1": "Renault",
   "VF6": "Renault",
   "UU1": "Renault",
   "X7L": "Renault",
   "ADR": "Renault",
   "ZFA": "Fiat",
   "8AP": "Fiat",
   "9BD": "Fiat",
   "AFZ": "Fiat",
   "BRY": "Fiat",
   "ZAR": "Alfa Romeo",
   "ZAM": "Maserati",
   "ZFF": "Ferrari",
   "ZHW": "Lamborghini",
   "1G1": "Chevrolet",
   "2G1": "Chevrolet",
   "3G1": "Chevrolet",
   "1GC": "Chevrolet",
   "6G1": "Chevrolet",
   "1GT": "GMC",
   "1GD": "GMC",
   "1G6": "Cadillac",
   "1G4": "Buick",
   "1C3": "Chrysler",
   "2C3": "Chrysler",
   "1B3": "Dodge",
   "2B3": "Dodge",
   "1J4": "Jeep",
   "1J8": "Jeep",
   "1C4": "Jeep",
   "1C6": "RAM",
   "3C6": "RAM",
   "5YJ": "Tesla",
   "7SA": "Tesla",
   "LRW": "Tesla",
   "XP7": "Tesla",
   "7FG": "Rivian",
   "7G2": "Lucid",
   "LFB": "FAW",
   "LFP": "FAW",
   "LFW": "FAW",
   "LFN": "FAW",
   "LFT": "FAW",
   "LFV": "FAW",
   "LH1": "FAW",
   "AAK": "FAW",
   "LGW": "Great Wall/GWM",
   "LNV": "Great Wall/GWM",
   "LVV": "Chery",
   "98R": "Chery",
   "9UJ": "Chery",
   "LGX": "BYD",
   "LC0": "BYD",
   "L6T": "Geely",
   "LB3": "Geely",
   "LS5": "Changan",
   "LVS": "Changan",
   "LVR": "Changan",
   "AFD": "BAIC",
   "LSJ": "MG / SAIC",
   "LSV": "MG / SAIC",
   "LJZ": "MG / SAIC",
   "MAL": "Mahindra",
   "MAT": "Tata",
   "ADX": "Tata",
   "PL1": "Proton",
   "PM1": "Perodua",
   "JH1": "Hino",
   "JHK": "Hino",
   "AHH": "Hino",
   "JNC": "UD Trucks",
   "YS2": "Scania",
   "XLE": "Scania",
   "WMA": "MAN",
   "AAM": "MAN",
   "XLR": "DAF",
   "ZCF": "Iveco",
   "LZY": "Yutong",
   "ADV": "Afrit",
   "AA9": "Piet Retief Body Builder"
  },
  "matched": 6,
  "blurry": 3
 },
 "retention": {
  "source": "Retention_admin_automate",
  "aggregate": {
   "calls": 8,
   "segments": 63,
   "flagged": 24,
   "hallucinated": 5,
   "withReference": 4,
   "pooled": {
    "wer": 0.0954,
    "werNoHal": 0.0795,
    "cer": 0.1383,
    "cerNoHal": 0.1262
   },
   "languages": [
    "af",
    "en",
    "xh",
    "zu"
   ],
   "voiceClusters": [
    "VOICE_1000001",
    "VOICE_1000002"
   ],
   "transcribeSeconds": 395.6
  },
  "calls": [
   {
    "id": "1000001",
    "outcome": "Retained - Assisted with Query",
    "summary": "Caller queried a double billing charge; agent explained the proration and the charge was confirmed correct. Caller stayed.",
    "status": "ok",
    "verdict": "plausible",
    "totalSegments": 10,
    "flaggedSegments": 0,
    "worstAvgLogprob": -0.527,
    "hallucinated": 0,
    "transcribeSeconds": 57.2,
    "durationSeconds": 62.26,
    "speakers": {
     "agent": {
      "turns": 5,
      "speech_s": 35.19,
      "flagged_segments": 0
     },
     "client": {
      "turns": 5,
      "speech_s": 21.14,
      "flagged_segments": 0
     },
     "unknown": {
      "turns": 0,
      "speech_s": 0.0,
      "flagged_segments": 0
     },
     "method": "acoustic",
     "confidence": 0.91,
     "heuristic": "first-speaker"
    },
    "resemblyzer": {
     "confidence": 0.867
    },
    "languages": {
     "en": 8,
     "zu": 2
    },
    "agentVoice": {
     "method": "agent_voice",
     "voice_id": "VOICE_1000001",
     "cluster_size": 4,
     "members": [
      "1000001",
      "1000003",
      "1000005",
      "1000007"
     ]
    },
    "corrections": [],
    "hasReference": true,
    "wer": 0.0709,
    "cer": 0.1107,
    "werNoHal": 0.0709,
    "cerNoHal": 0.1107,
    "segments": [
     {
      "i": 0,
      "start": 0.0,
      "end": 4.74,
      "speaker": "agent",
      "text": "Good morning, thanks for calling. How can I help you today?",
      "lang": "en",
      "langProb": 0.811,
      "avgLogprob": -0.44,
      "noSpeechProb": 0.221,
      "compressionRatio": 0.91,
      "flags": [],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 1,
      "start": 5.6,
      "end": 12.57,
      "speaker": "client",
      "text": "Hi, I see two charges on my account this month and I want to know why.",
      "lang": "en",
      "langProb": 0.857,
      "avgLogprob": -0.219,
      "noSpeechProb": 0.128,
      "compressionRatio": 1.08,
      "flags": [],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 2,
      "start": 12.8,
      "end": 18.05,
      "speaker": "agent",
      "text": "Let me pull up your account. Can I get your reference number?",
      "lang": "en",
      "langProb": 0.749,
      "avgLogprob": -0.499,
      "noSpeechProb": 0.206,
      "compressionRatio": 1.16,
      "flags": [],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 3,
      "start": 18.82,
      "end": 24.47,
      "speaker": "client",
      "text": "Yes, it's on the statement, the account reference is four four two one.",
      "lang": "en",
      "langProb": 0.848,
      "avgLogprob": -0.419,
      "noSpeechProb": 0.186,
      "compressionRatio": 1.44,
      "flags": [],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 4,
      "start": 25.12,
      "end": 35.99,
      "speaker": "agent",
      "text": "Thank you. I can see the two entries. One is the normal monthly charge and the other is the adjustment from when you changed plan.",
      "lang": "en",
      "langProb": 0.762,
      "avgLogprob": -0.527,
      "noSpeechProb": 0.161,
      "compressionRatio": 1.59,
      "flags": [],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 5,
      "start": 36.45,
      "end": 39.04,
      "speaker": "client",
      "text": "So it's not a mistake?",
      "lang": "zu",
      "langProb": 0.857,
      "avgLogprob": -0.232,
      "noSpeechProb": 0.083,
      "compressionRatio": 1.24,
      "flags": [],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 6,
      "start": 39.9,
      "end": 49.53,
      "speaker": "agent",
      "text": "It isn't, but I understand why it looked like one. The change took effect mid-month so the system billed the difference separately.",
      "lang": "en",
      "langProb": 0.947,
      "avgLogprob": -0.381,
      "noSpeechProb": 0.236,
      "compressionRatio": 0.96,
      "flags": [],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 7,
      "start": 50.22,
      "end": 53.99,
      "speaker": "client",
      "text": "Okay that makes sense. Thank you for explaining.",
      "lang": "zu",
      "langProb": 0.917,
      "avgLogprob": -0.251,
      "noSpeechProb": 0.206,
      "compressionRatio": 1.33,
      "flags": [],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 8,
      "start": 54.59,
      "end": 59.29,
      "speaker": "agent",
      "text": "My pleasure. Is there anything else I can help with?",
      "lang": "en",
      "langProb": 0.851,
      "avgLogprob": -0.282,
      "noSpeechProb": 0.2,
      "compressionRatio": 1.39,
      "flags": [],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 9,
      "start": 60.1,
      "end": 62.26,
      "speaker": "client",
      "text": "No, that's all. Thanks.",
      "lang": "en",
      "langProb": 0.919,
      "avgLogprob": -0.296,
      "noSpeechProb": 0.05,
      "compressionRatio": 1.03,
      "flags": [],
      "hallucination": false,
      "lowConfWords": []
     }
    ]
   },
   {
    "id": "1000002",
    "outcome": "Cancelled - Price",
    "summary": "Caller asked to cancel, citing cost. A discounted plan was offered and declined; cancellation was processed with notice.",
    "status": "ok",
    "verdict": "hallucination",
    "totalSegments": 11,
    "flaggedSegments": 7,
    "worstAvgLogprob": -1.31,
    "hallucinated": 1,
    "transcribeSeconds": 33.6,
    "durationSeconds": 60.72,
    "speakers": {
     "agent": {
      "turns": 6,
      "speech_s": 37.68,
      "flagged_segments": 3
     },
     "client": {
      "turns": 5,
      "speech_s": 18.7,
      "flagged_segments": 4
     },
     "unknown": {
      "turns": 0,
      "speech_s": 0.0,
      "flagged_segments": 0
     },
     "method": "acoustic",
     "confidence": 0.84,
     "heuristic": "first-speaker"
    },
    "resemblyzer": {
     "confidence": 0.784
    },
    "languages": {
     "en": 9,
     "af": 2
    },
    "agentVoice": {
     "method": "agent_voice",
     "voice_id": "VOICE_1000002",
     "cluster_size": 4,
     "members": [
      "1000002",
      "1000004",
      "1000006",
      "1000008"
     ]
    },
    "corrections": [],
    "hasReference": true,
    "wer": 0.1395,
    "cer": 0.167,
    "werNoHal": 0.0775,
    "cerNoHal": 0.1206,
    "segments": [
     {
      "i": 0,
      "start": 0.0,
      "end": 4.39,
      "speaker": "agent",
      "text": "Good afternoon, thank you for calling. How may I assist?",
      "lang": "en",
      "langProb": 0.721,
      "avgLogprob": -0.7,
      "noSpeechProb": 0.054,
      "compressionRatio": 1.72,
      "flags": [],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 1,
      "start": 4.99,
      "end": 9.57,
      "speaker": "client",
      "text": "I want to cancel my subscription. It's too expensive now.",
      "lang": "af",
      "langProb": 0.909,
      "avgLogprob": -0.53,
      "noSpeechProb": 0.195,
      "compressionRatio": 2.45,
      "flags": [
       "repetition_risk"
      ],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 2,
      "start": 10.13,
      "end": 14.75,
      "speaker": "agent",
      "text": "I'm sorry to hear that. May I ask what changed?",
      "lang": "en",
      "langProb": 0.851,
      "avgLogprob": -0.61,
      "noSpeechProb": 0.52,
      "compressionRatio": 1.04,
      "flags": [],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 3,
      "start": 15.19,
      "end": 18.81,
      "speaker": "client",
      "text": "Everything went up this year. I'm cutting costs.",
      "lang": "en",
      "langProb": 0.849,
      "avgLogprob": -0.956,
      "noSpeechProb": 0.495,
      "compressionRatio": 2.85,
      "flags": [
       "repetition_risk"
      ],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 4,
      "start": 19.04,
      "end": 28.54,
      "speaker": "agent",
      "text": "I understand. Before we proceed, there is a lower tier that keeps the core features. Would you like to hear the price?",
      "lang": "en",
      "langProb": 0.906,
      "avgLogprob": -0.97,
      "noSpeechProb": 0.568,
      "compressionRatio": 2.57,
      "flags": [
       "repetition_risk"
      ],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 5,
      "start": 28.75,
      "end": 34.0,
      "speaker": "client",
      "text": "You can tell me but I think my mind is made up.",
      "lang": "en",
      "langProb": 0.962,
      "avgLogprob": -1.307,
      "noSpeechProb": 0.645,
      "compressionRatio": 2.67,
      "flags": [
       "low_confidence",
       "repetition_risk",
       "silence"
      ],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 6,
      "start": 34.42,
      "end": 39.79,
      "speaker": "agent",
      "text": "Of course. It would come to roughly a third less per month.",
      "lang": "en",
      "langProb": 0.98,
      "avgLogprob": -0.971,
      "noSpeechProb": 0.084,
      "compressionRatio": 2.39,
      "flags": [],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 7,
      "start": 40.03,
      "end": 43.6,
      "speaker": "client",
      "text": "No, I'd rather stop completely. Please cancel it.",
      "lang": "en",
      "langProb": 0.97,
      "avgLogprob": -0.542,
      "noSpeechProb": 0.044,
      "compressionRatio": 1.05,
      "flags": [],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 8,
      "start": 44.17,
      "end": 51.97,
      "speaker": "agent",
      "text": "Understood. I've logged the cancellation for the end of the current cycle. You'll get a confirmation by email.",
      "lang": "af",
      "langProb": 0.948,
      "avgLogprob": -1.039,
      "noSpeechProb": 0.004,
      "compressionRatio": 2.41,
      "flags": [
       "low_confidence",
       "repetition_risk"
      ],
      "hallucination": false,
      "lowConfWords": [
       "cancellation"
      ]
     },
     {
      "i": 9,
      "start": 52.64,
      "end": 54.32,
      "speaker": "client",
      "text": "Fine. Thank you.",
      "lang": "en",
      "langProb": 0.989,
      "avgLogprob": -1.31,
      "noSpeechProb": 0.25,
      "compressionRatio": 2.23,
      "flags": [
       "low_confidence"
      ],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 10,
      "start": 54.72,
      "end": 60.72,
      "speaker": "agent",
      "text": "Thank you. Thank you. Thank you. Thank you.",
      "lang": "en",
      "langProb": 0.791,
      "avgLogprob": -0.21,
      "noSpeechProb": 0.02,
      "compressionRatio": 6.1,
      "flags": [
       "repetition_risk"
      ],
      "hallucination": true,
      "lowConfWords": []
     }
    ]
   },
   {
    "id": "1000003",
    "outcome": "Pending - Call Back Requested",
    "summary": "Caller needed a decision from a partner before committing; agent arranged a callback for the following week.",
    "status": "ok",
    "verdict": "hallucination",
    "totalSegments": 9,
    "flaggedSegments": 6,
    "worstAvgLogprob": -1.324,
    "hallucinated": 1,
    "transcribeSeconds": 62.8,
    "durationSeconds": 42.29,
    "speakers": {
     "agent": {
      "turns": 5,
      "speech_s": 24.25,
      "flagged_segments": 3
     },
     "client": {
      "turns": 4,
      "speech_s": 13.67,
      "flagged_segments": 3
     },
     "unknown": {
      "turns": 0,
      "speech_s": 0.0,
      "flagged_segments": 0
     },
     "method": "acoustic",
     "confidence": 0.76,
     "heuristic": "first-speaker"
    },
    "resemblyzer": {
     "confidence": 0.744
    },
    "languages": {
     "en": 5,
     "zu": 4
    },
    "agentVoice": {
     "method": "agent_voice",
     "voice_id": "VOICE_1000001",
     "cluster_size": 4,
     "members": [
      "1000001",
      "1000003",
      "1000005",
      "1000007"
     ]
    },
    "corrections": [],
    "hasReference": false,
    "wer": null,
    "cer": null,
    "werNoHal": null,
    "cerNoHal": null,
    "segments": [
     {
      "i": 0,
      "start": 0.0,
      "end": 3.32,
      "speaker": "agent",
      "text": "Hello, good day. How can I help?",
      "lang": "en",
      "langProb": 0.736,
      "avgLogprob": -1.324,
      "noSpeechProb": 0.09,
      "compressionRatio": 1.9,
      "flags": [
       "low_confidence"
      ],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 1,
      "start": 4.15,
      "end": 10.88,
      "speaker": "client",
      "text": "I'm interested but I need to speak to my brother first, we share the vehicle.",
      "lang": "en",
      "langProb": 0.965,
      "avgLogprob": -0.731,
      "noSpeechProb": 0.39,
      "compressionRatio": 1.16,
      "flags": [],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 2,
      "start": 11.28,
      "end": 18.02,
      "speaker": "agent",
      "text": "That's sensible. Would you like me to call you back once you've had that conversation?",
      "lang": "zu",
      "langProb": 0.767,
      "avgLogprob": -1.231,
      "noSpeechProb": 0.301,
      "compressionRatio": 1.85,
      "flags": [
       "low_confidence"
      ],
      "hallucination": false,
      "lowConfWords": [
       "sensible."
      ]
     },
     {
      "i": 3,
      "start": 18.47,
      "end": 21.47,
      "speaker": "client",
      "text": "Yes please, maybe next week Tuesday.",
      "lang": "zu",
      "langProb": 0.745,
      "avgLogprob": -1.308,
      "noSpeechProb": 0.378,
      "compressionRatio": 2.36,
      "flags": [
       "low_confidence"
      ],
      "hallucination": false,
      "lowConfWords": [
       "please,"
      ]
     },
     {
      "i": 4,
      "start": 21.98,
      "end": 26.05,
      "speaker": "agent",
      "text": "I've noted Tuesday morning. Is this the best number?",
      "lang": "zu",
      "langProb": 0.831,
      "avgLogprob": -0.38,
      "noSpeechProb": 0.385,
      "compressionRatio": 1.81,
      "flags": [],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 5,
      "start": 26.75,
      "end": 29.28,
      "speaker": "client",
      "text": "Yes, this one is fine.",
      "lang": "zu",
      "langProb": 0.922,
      "avgLogprob": -1.296,
      "noSpeechProb": 0.126,
      "compressionRatio": 2.17,
      "flags": [
       "low_confidence"
      ],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 6,
      "start": 30.16,
      "end": 34.28,
      "speaker": "agent",
      "text": "Thank you. I'll call you then. Anything else today?",
      "lang": "en",
      "langProb": 0.882,
      "avgLogprob": -0.627,
      "noSpeechProb": 0.506,
      "compressionRatio": 1.98,
      "flags": [],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 7,
      "start": 34.48,
      "end": 35.89,
      "speaker": "client",
      "text": "No, that's everything.",
      "lang": "en",
      "langProb": 0.81,
      "avgLogprob": -1.209,
      "noSpeechProb": 0.573,
      "compressionRatio": 1.37,
      "flags": [
       "low_confidence"
      ],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 8,
      "start": 36.29,
      "end": 42.29,
      "speaker": "agent",
      "text": "Thank you. Thank you. Thank you. Thank you.",
      "lang": "en",
      "langProb": 0.907,
      "avgLogprob": -0.21,
      "noSpeechProb": 0.02,
      "compressionRatio": 6.1,
      "flags": [
       "repetition_risk"
      ],
      "hallucination": true,
      "lowConfWords": []
     }
    ]
   },
   {
    "id": "1000004",
    "outcome": "No Answer",
    "summary": "Outbound callback attempt; no answer, voicemail not enabled. Recorded as unreachable for this attempt.",
    "status": "ok",
    "verdict": "plausible",
    "totalSegments": 2,
    "flaggedSegments": 2,
    "worstAvgLogprob": -1.077,
    "hallucinated": 1,
    "transcribeSeconds": 56.3,
    "durationSeconds": 14.77,
    "speakers": {
     "agent": {
      "turns": 1,
      "speech_s": 14.37,
      "flagged_segments": 2
     },
     "client": {
      "turns": 0,
      "speech_s": 0.0,
      "flagged_segments": 0
     },
     "unknown": {
      "turns": 0,
      "speech_s": 0.0,
      "flagged_segments": 0
     },
     "method": "acoustic",
     "confidence": 0.58,
     "heuristic": "first-speaker"
    },
    "resemblyzer": {
     "confidence": 0.809
    },
    "languages": {
     "en": 2
    },
    "agentVoice": {
     "method": "agent_voice",
     "voice_id": "VOICE_1000002",
     "cluster_size": 4,
     "members": [
      "1000002",
      "1000004",
      "1000006",
      "1000008"
     ]
    },
    "corrections": [],
    "hasReference": false,
    "wer": null,
    "cer": null,
    "werNoHal": null,
    "cerNoHal": null,
    "segments": [
     {
      "i": 0,
      "start": 0.0,
      "end": 8.37,
      "speaker": "agent",
      "text": "Hello, this is the customer team calling back as arranged. Please give me a ring when you get this.",
      "lang": "en",
      "langProb": 0.653,
      "avgLogprob": -1.077,
      "noSpeechProb": 0.491,
      "compressionRatio": 2.67,
      "flags": [
       "low_confidence",
       "repetition_risk"
      ],
      "hallucination": false,
      "lowConfWords": [
       "customer"
      ]
     },
     {
      "i": 1,
      "start": 8.77,
      "end": 14.77,
      "speaker": "agent",
      "text": "Thank you. Thank you. Thank you. Thank you.",
      "lang": "en",
      "langProb": 0.449,
      "avgLogprob": -0.21,
      "noSpeechProb": 0.02,
      "compressionRatio": 6.1,
      "flags": [
       "repetition_risk"
      ],
      "hallucination": true,
      "lowConfWords": []
     }
    ]
   },
   {
    "id": "1000005",
    "outcome": "Query - Resolved",
    "summary": "Caller could not log in to the portal. Agent walked through a password reset and confirmed access was restored.",
    "status": "ok",
    "verdict": "plausible",
    "totalSegments": 10,
    "flaggedSegments": 0,
    "worstAvgLogprob": -0.539,
    "hallucinated": 0,
    "transcribeSeconds": 51.6,
    "durationSeconds": 48.45,
    "speakers": {
     "agent": {
      "turns": 5,
      "speech_s": 26.6,
      "flagged_segments": 0
     },
     "client": {
      "turns": 5,
      "speech_s": 16.75,
      "flagged_segments": 0
     },
     "unknown": {
      "turns": 0,
      "speech_s": 0.0,
      "flagged_segments": 0
     },
     "method": "acoustic",
     "confidence": 0.93,
     "heuristic": "first-speaker"
    },
    "resemblyzer": {
     "confidence": 0.877
    },
    "languages": {
     "en": 9,
     "xh": 1
    },
    "agentVoice": {
     "method": "agent_voice",
     "voice_id": "VOICE_1000001",
     "cluster_size": 4,
     "members": [
      "1000001",
      "1000003",
      "1000005",
      "1000007"
     ]
    },
    "corrections": [],
    "hasReference": true,
    "wer": 0.087,
    "cer": 0.1429,
    "werNoHal": 0.087,
    "cerNoHal": 0.1429,
    "segments": [
     {
      "i": 0,
      "start": 0.0,
      "end": 3.51,
      "speaker": "agent",
      "text": "Good morning, how can I help you today?",
      "lang": "en",
      "langProb": 0.793,
      "avgLogprob": -0.448,
      "noSpeechProb": 0.029,
      "compressionRatio": 0.97,
      "flags": [],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 1,
      "start": 4.0,
      "end": 8.92,
      "speaker": "client",
      "text": "I can't log into the portal, it keeps rejecting my password.",
      "lang": "en",
      "langProb": 0.812,
      "avgLogprob": -0.35,
      "noSpeechProb": 0.237,
      "compressionRatio": 1.14,
      "flags": [],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 2,
      "start": 9.65,
      "end": 16.94,
      "speaker": "agent",
      "text": "Sorry about that. Let's reset it. Do you see a 'forgot password' link on the sign-in screen?",
      "lang": "en",
      "langProb": 0.728,
      "avgLogprob": -0.473,
      "noSpeechProb": 0.211,
      "compressionRatio": 1.72,
      "flags": [],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 3,
      "start": 17.69,
      "end": 19.65,
      "speaker": "client",
      "text": "Yes, I see it.",
      "lang": "en",
      "langProb": 0.918,
      "avgLogprob": -0.281,
      "noSpeechProb": 0.112,
      "compressionRatio": 1.39,
      "flags": [],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 4,
      "start": 20.12,
      "end": 27.82,
      "speaker": "agent",
      "text": "Click that and use the email address on the account. The reset link arrives within a few minutes.",
      "lang": "en",
      "langProb": 0.755,
      "avgLogprob": -0.333,
      "noSpeechProb": 0.081,
      "compressionRatio": 1.04,
      "flags": [],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 5,
      "start": 28.48,
      "end": 33.06,
      "speaker": "client",
      "text": "Okay, I've done it. It's asking for a new password.",
      "lang": "en",
      "langProb": 0.837,
      "avgLogprob": -0.482,
      "noSpeechProb": 0.143,
      "compressionRatio": 1.79,
      "flags": [],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 6,
      "start": 33.74,
      "end": 37.89,
      "speaker": "agent",
      "text": "Choose something you haven't used before and confirm it.",
      "lang": "en",
      "langProb": 0.802,
      "avgLogprob": -0.539,
      "noSpeechProb": 0.118,
      "compressionRatio": 1.7,
      "flags": [],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 7,
      "start": 38.1,
      "end": 41.8,
      "speaker": "client",
      "text": "Done. I'm in now. Thank you very much.",
      "lang": "en",
      "langProb": 0.845,
      "avgLogprob": -0.366,
      "noSpeechProb": 0.192,
      "compressionRatio": 1.33,
      "flags": [],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 8,
      "start": 42.47,
      "end": 46.42,
      "speaker": "agent",
      "text": "Glad that worked. Anything else I can help with?",
      "lang": "xh",
      "langProb": 0.876,
      "avgLogprob": -0.284,
      "noSpeechProb": 0.162,
      "compressionRatio": 1.84,
      "flags": [],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 9,
      "start": 46.86,
      "end": 48.45,
      "speaker": "client",
      "text": "No, that's it.",
      "lang": "en",
      "langProb": 0.846,
      "avgLogprob": -0.438,
      "noSpeechProb": 0.155,
      "compressionRatio": 1.45,
      "flags": [],
      "hallucination": false,
      "lowConfWords": []
     }
    ]
   },
   {
    "id": "1000006",
    "outcome": "Retained - Accepted Offer",
    "summary": "Caller was considering leaving for a cheaper provider. A bundled discount was accepted and the account was kept.",
    "status": "ok",
    "verdict": "plausible",
    "totalSegments": 10,
    "flaggedSegments": 0,
    "worstAvgLogprob": -0.543,
    "hallucinated": 0,
    "transcribeSeconds": 56.4,
    "durationSeconds": 51.83,
    "speakers": {
     "agent": {
      "turns": 5,
      "speech_s": 27.77,
      "flagged_segments": 0
     },
     "client": {
      "turns": 5,
      "speech_s": 18.18,
      "flagged_segments": 0
     },
     "unknown": {
      "turns": 0,
      "speech_s": 0.0,
      "flagged_segments": 0
     },
     "method": "acoustic",
     "confidence": 0.95,
     "heuristic": "first-speaker"
    },
    "resemblyzer": {
     "confidence": 0.726
    },
    "languages": {
     "af": 1,
     "en": 9
    },
    "agentVoice": {
     "method": "agent_voice",
     "voice_id": "VOICE_1000002",
     "cluster_size": 4,
     "members": [
      "1000002",
      "1000004",
      "1000006",
      "1000008"
     ]
    },
    "corrections": [],
    "hasReference": true,
    "wer": 0.0847,
    "cer": 0.1357,
    "werNoHal": 0.0847,
    "cerNoHal": 0.1357,
    "segments": [
     {
      "i": 0,
      "start": 0.0,
      "end": 4.3,
      "speaker": "agent",
      "text": "Good day, thank you for calling. How may I help?",
      "lang": "af",
      "langProb": 0.843,
      "avgLogprob": -0.212,
      "noSpeechProb": 0.081,
      "compressionRatio": 1.51,
      "flags": [],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 1,
      "start": 5.05,
      "end": 10.32,
      "speaker": "client",
      "text": "I got a quote from another company that's quite a bit cheaper.",
      "lang": "en",
      "langProb": 0.778,
      "avgLogprob": -0.295,
      "noSpeechProb": 0.247,
      "compressionRatio": 1.02,
      "flags": [],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 2,
      "start": 10.92,
      "end": 15.65,
      "speaker": "agent",
      "text": "I appreciate you telling me. May I ask what they quoted?",
      "lang": "en",
      "langProb": 0.926,
      "avgLogprob": -0.269,
      "noSpeechProb": 0.151,
      "compressionRatio": 1.33,
      "flags": [],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 3,
      "start": 16.34,
      "end": 20.68,
      "speaker": "client",
      "text": "About two hundred less per month for the same cover.",
      "lang": "en",
      "langProb": 0.958,
      "avgLogprob": -0.236,
      "noSpeechProb": 0.227,
      "compressionRatio": 1.45,
      "flags": [],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 4,
      "start": 21.19,
      "end": 30.31,
      "speaker": "agent",
      "text": "Thank you. I can look at a bundle that brings you close to that while keeping your existing history and equipment.",
      "lang": "en",
      "langProb": 0.872,
      "avgLogprob": -0.33,
      "noSpeechProb": 0.122,
      "compressionRatio": 1.05,
      "flags": [],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 5,
      "start": 30.7,
      "end": 34.25,
      "speaker": "client",
      "text": "If you can get near it, I'll stay.",
      "lang": "en",
      "langProb": 0.98,
      "avgLogprob": -0.23,
      "noSpeechProb": 0.176,
      "compressionRatio": 0.99,
      "flags": [],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 6,
      "start": 34.96,
      "end": 40.01,
      "speaker": "agent",
      "text": "I can apply the loyalty discount and a twelve-month rate hold.",
      "lang": "en",
      "langProb": 0.786,
      "avgLogprob": -0.462,
      "noSpeechProb": 0.055,
      "compressionRatio": 1.83,
      "flags": [],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 7,
      "start": 40.63,
      "end": 44.03,
      "speaker": "client",
      "text": "That works for me. Let's do that.",
      "lang": "en",
      "langProb": 0.83,
      "avgLogprob": -0.255,
      "noSpeechProb": 0.202,
      "compressionRatio": 1.82,
      "flags": [],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 8,
      "start": 44.79,
      "end": 49.36,
      "speaker": "agent",
      "text": "Done. You'll see the new rate on the next statement.",
      "lang": "en",
      "langProb": 0.85,
      "avgLogprob": -0.203,
      "noSpeechProb": 0.174,
      "compressionRatio": 1.44,
      "flags": [],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 9,
      "start": 50.21,
      "end": 51.83,
      "speaker": "client",
      "text": "Great, thank you.",
      "lang": "en",
      "langProb": 0.981,
      "avgLogprob": -0.543,
      "noSpeechProb": 0.097,
      "compressionRatio": 1.42,
      "flags": [],
      "hallucination": false,
      "lowConfWords": []
     }
    ]
   },
   {
    "id": "1000007",
    "outcome": "Busy",
    "summary": "Outbound attempt returned a busy tone; no conversation took place and the attempt was logged.",
    "status": "ok",
    "verdict": "plausible",
    "totalSegments": 2,
    "flaggedSegments": 1,
    "worstAvgLogprob": -0.986,
    "hallucinated": 1,
    "transcribeSeconds": 44.7,
    "durationSeconds": 9.22,
    "speakers": {
     "agent": {
      "turns": 1,
      "speech_s": 8.82,
      "flagged_segments": 1
     },
     "client": {
      "turns": 0,
      "speech_s": 0.0,
      "flagged_segments": 0
     },
     "unknown": {
      "turns": 0,
      "speech_s": 0.0,
      "flagged_segments": 0
     },
     "method": "acoustic",
     "confidence": 0.54,
     "heuristic": "first-speaker"
    },
    "resemblyzer": {
     "confidence": 0.793
    },
    "languages": {
     "en": 2
    },
    "agentVoice": {
     "method": "agent_voice",
     "voice_id": "VOICE_1000001",
     "cluster_size": 4,
     "members": [
      "1000001",
      "1000003",
      "1000005",
      "1000007"
     ]
    },
    "corrections": [],
    "hasReference": false,
    "wer": null,
    "cer": null,
    "werNoHal": null,
    "cerNoHal": null,
    "segments": [
     {
      "i": 0,
      "start": 0.0,
      "end": 2.82,
      "speaker": "agent",
      "text": "Calling the customer back as scheduled.",
      "lang": "en",
      "langProb": 0.645,
      "avgLogprob": -0.986,
      "noSpeechProb": 0.346,
      "compressionRatio": 1.79,
      "flags": [],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 1,
      "start": 3.22,
      "end": 9.22,
      "speaker": "agent",
      "text": "Thank you. Thank you. Thank you. Thank you.",
      "lang": "en",
      "langProb": 0.557,
      "avgLogprob": -0.21,
      "noSpeechProb": 0.02,
      "compressionRatio": 6.1,
      "flags": [
       "repetition_risk"
      ],
      "hallucination": true,
      "lowConfWords": []
     }
    ]
   },
   {
    "id": "1000008",
    "outcome": "Lost - Chose Competitor",
    "summary": "Caller had already signed with another provider. Agent confirmed the account closure and explained the notice period.",
    "status": "ok",
    "verdict": "hallucination",
    "totalSegments": 9,
    "flaggedSegments": 8,
    "worstAvgLogprob": -1.319,
    "hallucinated": 1,
    "transcribeSeconds": 33.0,
    "durationSeconds": 45.96,
    "speakers": {
     "agent": {
      "turns": 5,
      "speech_s": 28.56,
      "flagged_segments": 4
     },
     "client": {
      "turns": 4,
      "speech_s": 13.71,
      "flagged_segments": 4
     },
     "unknown": {
      "turns": 0,
      "speech_s": 0.0,
      "flagged_segments": 0
     },
     "method": "acoustic",
     "confidence": 0.79,
     "heuristic": "first-speaker"
    },
    "resemblyzer": {
     "confidence": 0.845
    },
    "languages": {
     "en": 7,
     "zu": 2
    },
    "agentVoice": {
     "method": "agent_voice",
     "voice_id": "VOICE_1000002",
     "cluster_size": 4,
     "members": [
      "1000002",
      "1000004",
      "1000006",
      "1000008"
     ]
    },
    "corrections": [],
    "hasReference": false,
    "wer": null,
    "cer": null,
    "werNoHal": null,
    "cerNoHal": null,
    "segments": [
     {
      "i": 0,
      "start": 0.0,
      "end": 3.51,
      "speaker": "agent",
      "text": "Good afternoon, how can I help you today?",
      "lang": "en",
      "langProb": 0.846,
      "avgLogprob": -0.624,
      "noSpeechProb": 0.385,
      "compressionRatio": 2.45,
      "flags": [
       "repetition_risk"
      ],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 1,
      "start": 3.73,
      "end": 9.11,
      "speaker": "client",
      "text": "I've already signed with someone else, so I need to close this.",
      "lang": "zu",
      "langProb": 0.958,
      "avgLogprob": -1.157,
      "noSpeechProb": 0.29,
      "compressionRatio": 2.87,
      "flags": [
       "low_confidence",
       "repetition_risk"
      ],
      "hallucination": false,
      "lowConfWords": [
       "someone"
      ]
     },
     {
      "i": 2,
      "start": 9.91,
      "end": 15.02,
      "speaker": "agent",
      "text": "I'm sorry to hear that. May I ask what decided it?",
      "lang": "zu",
      "langProb": 0.784,
      "avgLogprob": -1.232,
      "noSpeechProb": 0.556,
      "compressionRatio": 2.11,
      "flags": [
       "low_confidence"
      ],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 3,
      "start": 15.46,
      "end": 18.95,
      "speaker": "client",
      "text": "Mostly the price, and they included the installation.",
      "lang": "en",
      "langProb": 0.959,
      "avgLogprob": -1.277,
      "noSpeechProb": 0.314,
      "compressionRatio": 2.59,
      "flags": [
       "low_confidence",
       "repetition_risk"
      ],
      "hallucination": false,
      "lowConfWords": [
       "installation."
      ]
     },
     {
      "i": 4,
      "start": 19.32,
      "end": 27.91,
      "speaker": "agent",
      "text": "Thank you for being straight with me. I'll process the closure. There's a thirty day notice period on the agreement.",
      "lang": "en",
      "langProb": 0.724,
      "avgLogprob": -0.543,
      "noSpeechProb": 0.56,
      "compressionRatio": 2.15,
      "flags": [],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 5,
      "start": 28.12,
      "end": 30.44,
      "speaker": "client",
      "text": "That's fine, I expected that.",
      "lang": "en",
      "langProb": 0.913,
      "avgLogprob": -1.319,
      "noSpeechProb": 0.249,
      "compressionRatio": 2.53,
      "flags": [
       "low_confidence",
       "repetition_risk"
      ],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 6,
      "start": 31.04,
      "end": 36.39,
      "speaker": "agent",
      "text": "You'll receive a final statement and a collection instruction for the equipment.",
      "lang": "en",
      "langProb": 0.952,
      "avgLogprob": -0.628,
      "noSpeechProb": 0.146,
      "compressionRatio": 2.53,
      "flags": [
       "repetition_risk"
      ],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 7,
      "start": 37.04,
      "end": 39.56,
      "speaker": "client",
      "text": "Understood. Thanks for your help.",
      "lang": "en",
      "langProb": 0.867,
      "avgLogprob": -1.153,
      "noSpeechProb": 0.218,
      "compressionRatio": 1.38,
      "flags": [
       "low_confidence"
      ],
      "hallucination": false,
      "lowConfWords": []
     },
     {
      "i": 8,
      "start": 39.96,
      "end": 45.96,
      "speaker": "agent",
      "text": "Thank you. Thank you. Thank you. Thank you.",
      "lang": "en",
      "langProb": 0.736,
      "avgLogprob": -0.21,
      "noSpeechProb": 0.02,
      "compressionRatio": 6.1,
      "flags": [
       "repetition_risk"
      ],
      "hallucination": true,
      "lowConfWords": []
     }
    ]
   }
  ]
 }
};
