
import { Station, Route, TrainSchedule, StationDetailedInfo, Gate, Lift, Platform, StationFacility, ParkingCapacity } from "../types/metro";

// Detailed station information
const stationDetailedInfoMap: Record<string, StationDetailedInfo> = {
  "IIT Kanpur": {
    line: "Orange Line",
    serviceStatus: "Normal Service",
    city: "Kanpur",
    gates: [
      {
        number: "Gate No. 1",
        isOpen: true,
        nearby: ["National Sugar Institute"],
        code: "01"
      },
      {
        number: "Gate No. 2",
        isOpen: true,
        nearby: ["IIT Kanpur Campus", "Gooba Garden"],
        code: "02"
      }
    ],
    lifts: [
      {
        name: "ESC No.1",
        location: "Ground to Concourse",
        isInside: true,
        isDivyangFriendly: false,
        type: "ESC"
      },
      {
        name: "ESC No.2",
        location: "Concourse to Platfrom",
        isInside: true,
        isDivyangFriendly: false,
        type: "ESC"
      },
      {
        name: "ESC No.3",
        location: "Concourse to Platfrom",
        isInside: true,
        isDivyangFriendly: false,
        type: "ESC"
      },
      {
        name: "LIFT No. 1",
        location: "Ground to Concourse",
        isInside: false,
        isDivyangFriendly: true,
        type: "LIFT"
      },
      {
        name: "LIFT No. 2",
        location: "Ground to Concourse",
        isInside: false,
        isDivyangFriendly: true,
        type: "LIFT"
      },
      {
        name: "LIFT No. 3",
        location: "Concourse to Platfrom",
        isInside: true,
        isDivyangFriendly: true,
        type: "LIFT"
      },
      {
        name: "LIFT No. 4",
        location: "Concourse to Platfrom",
        isInside: true,
        isDivyangFriendly: true,
        type: "LIFT"
      }
    ],
    platforms: [
      {
        number: "Platform No. 1",
        towards: "Towards KANPUR CENTRAL",
        code: "01"
      },
      {
        number: "Platform No. 2",
        towards: "Towards IIT KANPUR (This is the First Station)",
        code: "02"
      }
    ],
    facilities: [
      {
        type: "Water",
        name: "WATER COOLER",
        location: "Concourse Paid area"
      },
      {
        type: "Toilet",
        name: "Toilet",
        location: "Concourse Paid area"
      },
      {
        type: "Food / Restaurant",
        name: "DOMINOS",
        location: "GROUND NEAR GATE-1"
      },
      {
        type: "Food / Restaurant",
        name: "BIKANERVALA",
        location: "GROUND NEAR GATE-2"
      },
      {
        type: "Food / Restaurant",
        name: "SAMOCHA",
        location: "CONCOURSE NEAR GATE-2 UNPAID"
      }
    ],
    parking: {
      bicycle: { available: 50 },
      car: { available: 15 },
      bike: { available: 30 }
    }
  },
  "Kalyanpur": {
    line: "Line 1",
    serviceStatus: "Normal Service",
    city: "Kanpur",
    gates: [
      {
        number: "Gate No. 1",
        isOpen: true,
        nearby: ["NEW AZAD NAGAR", "INDIRA NAGAR"],
        code: "01"
      },
      {
        number: "Gate No. 2",
        isOpen: true,
        nearby: ["KALYANPUR MARKET", "PARVATI NAGAR"],
        code: "02"
      }
    ],
    lifts: [
      {
        name: "ESC No.2",
        location: "Concourse to Platfrom",
        isInside: true,
        isDivyangFriendly: false,
        type: "ESC"
      },
      {
        name: "ESC No.3",
        location: "Concourse to Platfrom",
        isInside: true,
        isDivyangFriendly: false,
        type: "ESC"
      },
      {
        name: "LIFT No. 1",
        location: "Ground to Concourse",
        isInside: false,
        isDivyangFriendly: true,
        type: "LIFT"
      },
      {
        name: "LIFT No. 2",
        location: "Concourse to Platfrom",
        isInside: true,
        isDivyangFriendly: true,
        type: "LIFT"
      },
      {
        name: "LIFT No. 3",
        location: "Concourse to Platfrom",
        isInside: true,
        isDivyangFriendly: true,
        type: "LIFT"
      }
    ],
    platforms: [
      {
        number: "Platform No. 1",
        towards: "Towards KANPUR CENTRAL",
        code: "01"
      },
      {
        number: "Platform No. 2",
        towards: "Towards IIT KANPUR",
        code: "02"
      }
    ],
    facilities: [
      {
        type: "Water",
        name: "WATER COOLER",
        location: "Concourse Paid area"
      },
      {
        type: "Toilet",
        name: "Toilet",
        location: "Concourse Paid area"
      },
      {
        type: "Food / Restaurant",
        name: "WOW MOMO",
        location: "GROUND NEAR GATE-2"
      }
    ],
    parking: {
      bicycle: { available: 25 },
      car: { available: 0 },
      bike: { available: 15 }
    }
  },
  "SPM Hospital": {
    line: "Line 1",
    serviceStatus: "Normal Service",
    city: "Kanpur",
    gates: [
      {
        number: "Gate No. 1",
        isOpen: true,
        nearby: ["GULMOHAR EXOTICA APARTMENTS"],
        code: "01"
      },
      {
        number: "Gate No. 2",
        isOpen: true,
        nearby: ["BAGIA CROSSING"],
        code: "02"
      }
    ],
    lifts: [
      {
        name: "ESC No.1",
        location: "Ground to Concourse",
        isInside: true,
        isDivyangFriendly: false,
        type: "ESC"
      },
      {
        name: "ESC No.2",
        location: "Concourse to Platfrom",
        isInside: true,
        isDivyangFriendly: false,
        type: "ESC"
      },
      {
        name: "ESC No.3",
        location: "Concourse to Platfrom",
        isInside: true,
        isDivyangFriendly: false,
        type: "ESC"
      },
      {
        name: "LIFT No. 1",
        location: "Ground to Concourse",
        isInside: false,
        isDivyangFriendly: true,
        type: "LIFT"
      },
      {
        name: "LIFT No. 2",
        location: "Concourse to Platfrom",
        isInside: true,
        isDivyangFriendly: true,
        type: "LIFT"
      },
      {
        name: "LIFT No. 3",
        location: "Concourse to Platfrom",
        isInside: true,
        isDivyangFriendly: true,
        type: "LIFT"
      }
    ],
    platforms: [
      {
        number: "Platform No. 1",
        towards: "Towards KANPUR CENTRAL",
        code: "01"
      },
      {
        number: "Platform No. 2",
        towards: "Towards IIT KANPUR",
        code: "02"
      }
    ],
    facilities: [
      {
        type: "Water",
        name: "WATER COOLER",
        location: "Concourse Paid area"
      },
      {
        type: "Toilet",
        name: "Toilet",
        location: "Concourse Paid area"
      },
      {
        type: "Food / Restaurant",
        name: "CHINESE WOW",
        location: "GROUND NEAR GATE-2"
      }
    ],
    parking: {
      bicycle: { available: 30 },
      car: { available: 8 },
      bike: { available: 20 }
    }
  },
  "Vishwavidyalaya": {
    line: "Line 1",
    serviceStatus: "Normal Service",
    city: "Kanpur",
    gates: [
      {
        number: "Gate No. 1",
        isOpen: true,
        nearby: ["CSJM UNIVERSITY CAMPUS"],
        code: "01"
      },
      {
        number: "Gate No. 2",
        isOpen: true,
        nearby: ["IIPR CAMPUS"],
        code: "02"
      }
    ],
    lifts: [
      {
        name: "ESC No.1",
        location: "Ground to Concourse",
        isInside: true,
        isDivyangFriendly: false,
        type: "ESC"
      },
      {
        name: "ESC No.2",
        location: "Concourse to Platfrom",
        isInside: true,
        isDivyangFriendly: false,
        type: "ESC"
      },
      {
        name: "ESC No.3",
        location: "Concourse to Platfrom",
        isInside: true,
        isDivyangFriendly: false,
        type: "ESC"
      },
      {
        name: "LIFT No. 1",
        location: "Ground to Concourse",
        isInside: false,
        isDivyangFriendly: true,
        type: "LIFT"
      },
      {
        name: "LIFT No. 2",
        location: "Concourse to Platfrom",
        isInside: true,
        isDivyangFriendly: true,
        type: "LIFT"
      },
      {
        name: "LIFT No. 3",
        location: "Concourse to Platfrom",
        isInside: true,
        isDivyangFriendly: true,
        type: "LIFT"
      }
    ],
    platforms: [
      {
        number: "Platform No. 1",
        towards: "Towards KANPUR CENTRAL",
        code: "01"
      },
      {
        number: "Platform No. 2",
        towards: "Towards IIT KANPUR",
        code: "02"
      }
    ],
    facilities: [
      {
        type: "Water",
        name: "WATER COOLER",
        location: "Concourse Paid area"
      },
      {
        type: "Toilet",
        name: "Toilet",
        location: "Concourse Paid area"
      },
      {
        type: "Food / Restaurant",
        name: "DOMINOS",
        location: "GROUND NEAR GATE-1"
      }
    ],
    parking: {
      bicycle: { available: 80 },
      car: { available: 20 },
      bike: { available: 60 }
    }
  },
  "Geeta Nagar": {
    line: "Line 1",
    serviceStatus: "Normal Service",
    city: "Kanpur",
    gates: [
      {
        number: "Gate No. 1",
        isOpen: true,
        nearby: ["NAWABGANJ"],
        code: "01"
      },
      {
        number: "Gate No. 2",
        isOpen: true,
        nearby: ["GEETA NAGAR", "SHARDA NAGAR", "CHAPEDA PULIA"],
        code: "02"
      }
    ],
    lifts: [
      {
        name: "ESC No.1",
        location: "Ground to Concourse",
        isInside: true,
        isDivyangFriendly: false,
        type: "ESC"
      },
      {
        name: "ESC No.2",
        location: "Concourse to Platfrom",
        isInside: true,
        isDivyangFriendly: false,
        type: "ESC"
      },
      {
        name: "LIFT No. 1",
        location: "Ground to Concourse",
        isInside: false,
        isDivyangFriendly: true,
        type: "LIFT"
      },
      {
        name: "LIFT No. 2",
        location: "Concourse to Platfrom",
        isInside: true,
        isDivyangFriendly: true,
        type: "LIFT"
      },
      {
        name: "LIFT No. 3",
        location: "Concourse to Platfrom",
        isInside: true,
        isDivyangFriendly: true,
        type: "LIFT"
      }
    ],
    platforms: [
      {
        number: "Platform No. 1",
        towards: "Towards KANPUR CENTRAL",
        code: "01"
      },
      {
        number: "Platform No. 2",
        towards: "Towards IIT KANPUR",
        code: "02"
      }
    ],
    facilities: [
      {
        type: "Water",
        name: "WATER COOLER",
        location: "Concourse Paid area"
      },
      {
        type: "Toilet",
        name: "Toilet",
        location: "Concourse Paid area"
      },
      {
        type: "Food / Restaurant",
        name: "DOMINOS",
        location: "GROUND NEAR GATE-1"
      }
    ],
    parking: {
      bicycle: { available: 30 },
      car: { available: 4 },
      bike: { available: 24 }
    }
  },
  "Rawatpur": {
    line: "Line 1",
    serviceStatus: "Normal Service",
    city: "Kanpur",
    gates: [
      {
        number: "Gate No. 1",
        isOpen: true,
        nearby: ["BUTLER PLACE", "AZAD UNIVERSITY", "LPS CARDIOLOGY"],
        code: "01"
      },
      {
        number: "Gate No. 2",
        isOpen: true,
        nearby: ["MOTI VIHAR SOCIETY", "RAVE MOTI MALL", "SARVODAY NAGAR"],
        code: "02"
      }
    ],
    lifts: [
      {
        name: "ESC No.1",
        location: "Ground to Concourse",
        isInside: true,
        isDivyangFriendly: false,
        type: "ESC"
      },
      {
        name: "ESC No.2",
        location: "Concourse to Platfrom",
        isInside: true,
        isDivyangFriendly: false,
        type: "ESC"
      },
      {
        name: "ESC No.3",
        location: "Concourse to Platfrom",
        isInside: true,
        isDivyangFriendly: false,
        type: "ESC"
      },
      {
        name: "LIFT No. 1",
        location: "Ground to Concourse",
        isInside: false,
        isDivyangFriendly: true,
        type: "LIFT"
      },
      {
        name: "LIFT No. 2",
        location: "Ground to Concourse",
        isInside: false,
        isDivyangFriendly: true,
        type: "LIFT"
      },
      {
        name: "LIFT No. 3",
        location: "Concourse to Platfrom",
        isInside: true,
        isDivyangFriendly: true,
        type: "LIFT"
      },
      {
        name: "LIFT No. 4",
        location: "Concourse to Platfrom",
        isInside: true,
        isDivyangFriendly: true,
        type: "LIFT"
      }
    ],
    platforms: [
      {
        number: "Platform No. 1",
        towards: "Towards KANPUR CENTRAL",
        code: "01"
      },
      {
        number: "Platform No. 2",
        towards: "Towards IIT KANPUR",
        code: "02"
      }
    ],
    facilities: [
      {
        type: "Water",
        name: "WATER COOLER",
        location: "Concourse Paid area"
      },
      {
        type: "Toilet",
        name: "Toilet",
        location: "Concourse Paid area"
      },
      {
        type: "Food / Restaurant",
        name: "FOOD FORUM",
        location: "GROUND NEAR GATE-1"
      }
    ],
    parking: {
      bicycle: { available: 180 },
      car: { available: 30 },
      bike: { available: 150 }
    }
  },
  "Gurudev Chauraha": {
    line: "Orange Line",
    serviceStatus: "Normal Service",
    city: "Kanpur",
    gates: [
      {
        number: "Gate No. 1",
        isOpen: true,
        nearby: ["Vikas Nagar", "LIC Colony"],
        code: "01"
      },
      {
        number: "Gate No. 2",
        isOpen: true,
        nearby: ["Vinayakpur", "Sharda Nagar"],
        code: "02"
      }
    ],
    lifts: [
      {
        name: "ESC No.1",
        location: "Ground to Concourse",
        isInside: true,
        isDivyangFriendly: true,
        type: "ESC"
      },
      {
        name: "ESC No.2",
        location: "Concourse to Platform",
        isInside: true,
        isDivyangFriendly: true,
        type: "ESC"
      },
      {
        name: "ESC No.3",
        location: "Concourse to Platform",
        isInside: true,
        isDivyangFriendly: true,
        type: "ESC"
      },
      {
        name: "LIFT No. 1",
        location: "Ground to Concourse",
        isInside: false,
        isDivyangFriendly: true,
        type: "LIFT"
      },
      {
        name: "LIFT No. 2",
        location: "Ground to Concourse",
        isInside: false,
        isDivyangFriendly: true,
        type: "LIFT"
      },
      {
        name: "LIFT No. 3",
        location: "Concourse to Platform",
        isInside: true,
        isDivyangFriendly: true,
        type: "LIFT"
      },
      {
        name: "LIFT No. 4",
        location: "Concourse to Platform",
        isInside: true,
        isDivyangFriendly: true,
        type: "LIFT"
      }
    ],
    platforms: [
      {
        number: "Platform No. 1",
        towards: "Towards KANPUR CENTRAL",
        code: "01"
      },
      {
        number: "Platform No. 2",
        towards: "Towards IIT KANPUR",
        code: "02"
      }
    ],
    facilities: [
      {
        type: "Water",
        name: "WATER COOLER",
        location: "Concourse Paid area"
      },
      {
        type: "Toilet",
        name: "Toilet",
        location: "Concourse Paid area"
      }
    ],
    parking: {
      bicycle: { available: 120 },
      car: { available: 0 },
      bike: { available: 94 }
    }
  },
  "LLR Hospital": {
    line: "Orange Line",
    serviceStatus: "Normal Service",
    city: "Kanpur",
    gates: [
      {
        number: "Gate No. 1",
        isOpen: true,
        nearby: ["Khalasi Line", "Arya Nagar"],
        code: "01"
      },
      {
        number: "Gate No. 2",
        isOpen: true,
        nearby: ["Lala Lajpat Rai Hospital"],
        code: "02"
      }
    ],
    lifts: [
      {
        name: "ESC No.1",
        location: "Ground to Concourse",
        isInside: true,
        isDivyangFriendly: true,
        type: "ESC"
      },
      {
        name: "ESC No.2",
        location: "Concourse to Platform",
        isInside: true,
        isDivyangFriendly: true,
        type: "ESC"
      },
      {
        name: "ESC No.3",
        location: "Concourse to Platform",
        isInside: true,
        isDivyangFriendly: true,
        type: "ESC"
      },
      {
        name: "LIFT No. 1",
        location: "Ground to Concourse",
        isInside: false,
        isDivyangFriendly: true,
        type: "LIFT"
      },
      {
        name: "LIFT No. 2",
        location: "Ground to Concourse",
        isInside: false,
        isDivyangFriendly: true,
        type: "LIFT"
      },
      {
        name: "LIFT No. 3",
        location: "Concourse to Platform",
        isInside: true,
        isDivyangFriendly: true,
        type: "LIFT"
      },
      {
        name: "LIFT No. 4",
        location: "Concourse to Platform",
        isInside: true,
        isDivyangFriendly: true,
        type: "LIFT"
      }
    ],
    platforms: [
      {
        number: "Platform No. 1",
        towards: "Towards KANPUR CENTRAL",
        code: "01"
      },
      {
        number: "Platform No. 2",
        towards: "Towards IIT KANPUR",
        code: "02"
      }
    ],
    facilities: [
      {
        type: "Water",
        name: "WATER COOLER",
        location: "Concourse Paid area"
      },
      {
        type: "Toilet",
        name: "Toilet",
        location: "Concourse Paid area"
      },
      {
        type: "Food / Restaurant",
        name: "DOMINOS",
        location: "Ground near Gate-2"
      }
    ],
    parking: {
      bicycle: { available: 20 },
      car: { available: 0 },
      bike: { available: 12 }
    }
  },
  "Motijheel": {
    line: "Orange Line",
    serviceStatus: "Normal Service",
    city: "Kanpur",
    gates: [
      {
        number: "Gate No. 1",
        isOpen: true,
        nearby: ["Swaroop Nagar Road", "Kaargil Park", "Lajpat Bhawan"],
        code: "01"
      },
      {
        number: "Gate No. 2",
        isOpen: true,
        nearby: ["KDA", "Kaargil Park", "Lajpat Bhawan"],
        code: "02"
      }
    ],
    lifts: [
      {
        name: "Escalator 1",
        location: "Ground to Concourse",
        isInside: true,
        isDivyangFriendly: false,
        type: "ESC"
      },
      {
        name: "Escalator 2",
        location: "Concourse to Platform",
        isInside: true,
        isDivyangFriendly: false,
        type: "ESC"
      },
      {
        name: "LIFT No. 1",
        location: "Ground to Concourse",
        isInside: true,
        isDivyangFriendly: true,
        type: "LIFT"
      },
      {
        name: "LIFT No. 2",
        location: "Concourse to Platform",
        isInside: true,
        isDivyangFriendly: true,
        type: "LIFT"
      }
    ],
    platforms: [
      {
        number: "Platform No. 1",
        towards: "Towards KANPUR CENTRAL",
        code: "01"
      },
      {
        number: "Platform No. 2",
        towards: "Towards IIT KANPUR",
        code: "02"
      }
    ],
    facilities: [
      {
        type: "Water",
        name: "WATER COOLER",
        location: "Unpaid area"
      },
      {
        type: "Toilet",
        name: "Toilet",
        location: "Unpaid area"
      },
      {
        type: "Ice-cream Parlor",
        name: "Ice-cream Parlor",
        location: "Near Gate 2"
      },
      {
        type: "Food / Restaurant",
        name: "Chinese Wok",
        location: "Gate 1"
      },
      {
        type: "Food / Restaurant",
        name: "Food Forum",
        location: "Gate 2"
      }
    ],
    parking: {
      bicycle: { available: 15 },
      car: { available: 0 },
      bike: { available: 10 }
    }
  },
  "Chunniganj": {
    line: "Orange Line",
    serviceStatus: "Normal Service",
    city: "Kanpur",
    gates: [
      {
        number: "Gate No. 1",
        isOpen: true,
        nearby: ["Naveen Market", "Lal Imli Chauraha"],
        code: "01"
      },
      {
        number: "Gate No. 2",
        isOpen: true,
        nearby: ["Motijheel Metro", "Chunni Ganj Chauraha"],
        code: "02"
      }
    ],
    lifts: [
      {
        name: "E-4",
        location: "IIT Side, Station Box",
        isInside: true,
        isDivyangFriendly: false,
        type: "ESC"
      },
      {
        name: "E-3",
        location: "Naubasta Side, Station Box",
        isInside: true,
        isDivyangFriendly: false,
        type: "ESC"
      },
      {
        name: "LIFT No. 1",
        location: "Ancillary Building Side",
        isInside: true,
        isDivyangFriendly: false,
        type: "LIFT"
      },
      {
        name: "LIFT No. 2",
        location: "Station Box",
        isInside: true,
        isDivyangFriendly: false,
        type: "LIFT"
      },
      {
        name: "LIFT No. 3",
        location: "Honda Side",
        isInside: true,
        isDivyangFriendly: false,
        type: "LIFT"
      }
    ],
    platforms: [
      {
        number: "Platform No. 1",
        towards: "Towards KANPUR CENTRAL",
        code: "01"
      },
      {
        number: "Platform No. 2",
        towards: "Towards IIT KANPUR",
        code: "02"
      }
    ],
    facilities: [
      {
        type: "Toilet",
        name: "Toilet",
        location: "Paid area"
      }
    ],
    parking: {
      bicycle: { available: 0 },
      car: { available: 0 },
      bike: { available: 0 }
    }
  },
  "Naveen Market": {
    line: "Orange Line",
    serviceStatus: "Normal Service",
    city: "Kanpur",
    gates: [
      {
        number: "Gate No. 1",
        isOpen: true,
        nearby: ["Bada Chauraha", "Down Side"],
        code: "01"
      },
      {
        number: "Gate No. 2",
        isOpen: true,
        nearby: ["Chunni Ganj", "Up Side"],
        code: "02"
      }
    ],
    lifts: [
      {
        name: "E-4",
        location: "IIT Side, Station Box",
        isInside: true,
        isDivyangFriendly: false,
        type: "ESC"
      },
      {
        name: "E-3",
        location: "Naubasta Side, Station Box",
        isInside: true,
        isDivyangFriendly: false,
        type: "ESC"
      },
      {
        name: "LIFT No. 1",
        location: "BJP Office Side",
        isInside: true,
        isDivyangFriendly: false,
        type: "LIFT"
      },
      {
        name: "LIFT No. 2",
        location: "Station Box",
        isInside: true,
        isDivyangFriendly: false,
        type: "LIFT"
      },
      {
        name: "LIFT No. 3",
        location: "Ancillary Building Side",
        isInside: true,
        isDivyangFriendly: false,
        type: "LIFT"
      }
    ],
    platforms: [
      {
        number: "Platform No. 1",
        towards: "Towards KANPUR CENTRAL",
        code: "01"
      },
      {
        number: "Platform No. 2",
        towards: "Towards IIT KANPUR",
        code: "02"
      }
    ],
    facilities: [
      {
        type: "Toilet",
        name: "Toilet",
        location: "Paid area"
      }
    ],
    parking: {
      bicycle: { available: 0 },
      car: { available: 0 },
      bike: { available: 0 }
    }
  },
  "Bada Chauraha": {
    line: "Orange Line",
    serviceStatus: "Normal Service",
    city: "Kanpur",
    gates: [
      {
        number: "Gate No. 1",
        isOpen: true,
        nearby: ["Naya Ganj", "Z Square"],
        code: "01"
      },
      {
        number: "Gate No. 2",
        isOpen: true,
        nearby: ["Naveen Market", "Ursula Hospital"],
        code: "02"
      }
    ],
    lifts: [
      {
        name: "E-4",
        location: "IIT Side, Station Box",
        isInside: true,
        isDivyangFriendly: false,
        type: "ESC"
      },
      {
        name: "E-3",
        location: "Naubasta Side, Station Box",
        isInside: true,
        isDivyangFriendly: false,
        type: "ESC"
      },
      {
        name: "LIFT No. 1",
        location: "Mall Side",
        isInside: true,
        isDivyangFriendly: false,
        type: "LIFT"
      },
      {
        name: "LIFT No. 2",
        location: "Station Box",
        isInside: true,
        isDivyangFriendly: false,
        type: "LIFT"
      },
      {
        name: "LIFT No. 3",
        location: "Ancillary Building Side",
        isInside: true,
        isDivyangFriendly: false,
        type: "LIFT"
      }
    ],
    platforms: [
      {
        number: "Platform No. 1",
        towards: "Towards KANPUR CENTRAL",
        code: "01"
      },
      {
        number: "Platform No. 2",
        towards: "Towards IIT KANPUR",
        code: "02"
      }
    ],
    facilities: [
      {
        type: "Toilet",
        name: "Toilet",
        location: "Paid area"
      }
    ],
    parking: {
      bicycle: { available: 0 },
      car: { available: 0 },
      bike: { available: 0 }
    }
  },
  "Nayaganj": {
    line: "Orange Line",
    serviceStatus: "Normal Service",
    city: "Kanpur",
    gates: [
      {
        number: "Gate No. 1",
        isOpen: true,
        nearby: ["Kanpur Central", "Centre for Sight Hospital"],
        code: "01"
      },
      {
        number: "Gate No. 2",
        isOpen: true,
        nearby: ["Kanpur Central", "Sagar Market"],
        code: "02"
      }
    ],
    lifts: [
      {
        name: "E-4",
        location: "IIT Side",
        isInside: true,
        isDivyangFriendly: false,
        type: "ESC"
      },
      {
        name: "E-3",
        location: "Naubasta Side",
        isInside: true,
        isDivyangFriendly: false,
        type: "ESC"
      },
      {
        name: "LIFT No. 3",
        location: "Sagar Market",
        isInside: true,
        isDivyangFriendly: false,
        type: "LIFT"
      },
      {
        name: "LIFT No. 4",
        location: "Grid-4",
        isInside: true,
        isDivyangFriendly: false,
        type: "LIFT"
      }
    ],
    platforms: [
      {
        number: "Platform No. 1",
        towards: "Towards KANPUR CENTRAL",
        code: "01"
      },
      {
        number: "Platform No. 2",
        towards: "Towards IIT KANPUR",
        code: "02"
      }
    ],
    facilities: [
      {
        type: "Toilet",
        name: "Toilet",
        location: "Paid area"
      }
    ],
    parking: {
      bicycle: { available: 0 },
      car: { available: 0 },
      bike: { available: 0 }
    }
  },
  "Kanpur Central": {
    line: "Orange Line",
    serviceStatus: "Normal Service",
    city: "Kanpur",
    gates: [
      {
        number: "Gate No. 1",
        isOpen: true,
        nearby: ["Naya Ganj", "Railway Station Car Parking"],
        code: "01"
      },
      {
        number: "Gate No. 2",
        isOpen: true,
        nearby: ["Railway Station Platform 9", "Ticket Counter"],
        code: "02"
      }
    ],
    lifts: [
      {
        name: "E-4",
        location: "IIT Side, Station Box",
        isInside: true,
        isDivyangFriendly: true,
        type: "ESC"
      },
      {
        name: "E-3",
        location: "Naubasta Side, Station Box",
        isInside: true,
        isDivyangFriendly: true,
        type: "ESC"
      },
      {
        name: "LIFT No. 1",
        location: "Podium to Concourse",
        isInside: true,
        isDivyangFriendly: true,
        type: "LIFT"
      },
      {
        name: "LIFT No. 2",
        location: "Station Box",
        isInside: true,
        isDivyangFriendly: true,
        type: "LIFT"
      }
    ],
    platforms: [
      {
        number: "Platform No. 1",
        towards: "Towards KANPUR CENTRAL (Last Station)",
        code: "01"
      },
      {
        number: "Platform No. 2",
        towards: "Towards IIT KANPUR",
        code: "02"
      }
    ],
    facilities: [
      {
        type: "Toilet",
        name: "Toilet",
        location: "Paid area"
      }
    ],
    parking: {
      bicycle: { available: 0 },
      car: { available: 0 },
      bike: { available: 0 }
    }
  }
};

// All stations on the Orange Line
export const orangeLineStations: Station[] = [
  {
    id: 1,
    name: "IIT Kanpur",
    isOperational: true,
    isUnderground: false,
    platformCount: 2,
    landmarks: ["IIT Kanpur Campus", "Kalyanpur Market"],
    detailedInfo: stationDetailedInfoMap["IIT Kanpur"]
  },
  {
    id: 2,
    name: "Kalyanpur",
    isOperational: true,
    isUnderground: false,
    platformCount: 2,
    landmarks: ["Kalyanpur Residential Area", "Shopping Complex"],
    detailedInfo: stationDetailedInfoMap["Kalyanpur"]
  },
  {
    id: 3,
    name: "SPM Hospital",
    isOperational: true,
    isUnderground: false,
    platformCount: 2,
    landmarks: ["SPM Hospital", "Medical College"],
    detailedInfo: stationDetailedInfoMap["SPM Hospital"]
  },
  {
    id: 4,
    name: "Vishwavidyalaya",
    isOperational: true,
    isUnderground: false,
    platformCount: 2,
    landmarks: ["Kanpur University", "Library"],
    detailedInfo: stationDetailedInfoMap["Vishwavidyalaya"]
  },
  {
    id: 5,
    name: "Gurudev Chauraha",
    isOperational: true,
    isUnderground: false,
    platformCount: 2,
    landmarks: ["Gurudev Market", "Bus Stop"],
    detailedInfo: stationDetailedInfoMap["Gurudev Chauraha"]
  },
  {
    id: 6,
    name: "Geeta Nagar",
    isOperational: true,
    isUnderground: false,
    platformCount: 2,
    landmarks: ["Geeta Nagar Colony", "Park"],
    detailedInfo: stationDetailedInfoMap["Geeta Nagar"]
  },
  {
    id: 7,
    name: "Rawatpur",
    isOperational: true,
    isUnderground: false,
    platformCount: 2,
    landmarks: ["Rawatpur Railway Station", "Commercial Complex"],
    detailedInfo: stationDetailedInfoMap["Rawatpur"]
  },
  {
    id: 8,
    name: "LLR Hospital",
    isOperational: true,
    isUnderground: false,
    platformCount: 2,
    landmarks: ["LLR Hospital", "Medical College"],
    detailedInfo: stationDetailedInfoMap["LLR Hospital"]
  },
  {
    id: 9,
    name: "Motijheel",
    isOperational: true,
    isUnderground: false,
    platformCount: 2,
    landmarks: ["Motijheel Park", "Government Offices"],
    detailedInfo: stationDetailedInfoMap["Motijheel"]
  },
  {
    id: 10,
    name: "Chunniganj",
    isOperational: true,
    isUnderground: true,
    platformCount: 2,
    landmarks: ["Chunniganj Market", "Bus Terminal"],
    detailedInfo: stationDetailedInfoMap["Chunniganj"]
  },
  {
    id: 11,
    name: "Naveen Market",
    isOperational: true,
    isUnderground: true,
    platformCount: 2,
    landmarks: ["Naveen Market", "Shopping District"],
    detailedInfo: stationDetailedInfoMap["Naveen Market"]
  },
  {
    id: 12,
    name: "Bada Chauraha",
    isOperational: true,
    isUnderground: true,
    platformCount: 2,
    landmarks: ["Bada Chauraha Intersection", "Commercial Area"],
    detailedInfo: stationDetailedInfoMap["Bada Chauraha"]
  },
  {
    id: 13,
    name: "Nayaganj",
    isOperational: true,
    isUnderground: true,
    platformCount: 2,
    landmarks: ["Nayaganj Market", "Residential Area"],
    detailedInfo: stationDetailedInfoMap["Nayaganj"]
  },
  {
    id: 14,
    name: "Kanpur Central",
    isOperational: true,
    isUnderground: true,
    platformCount: 2,
    landmarks: ["Kanpur Central Railway Station", "Tourist Information Center"],
    detailedInfo: stationDetailedInfoMap["Kanpur Central"]
  },
];

// Helper function to generate dummy next train data
export function generateDummyNextTrains(stationId: number): TrainSchedule[] {
  const currentTime = new Date();
  const direction = stationId < 8 ? "Kanpur Central" : "IIT Kanpur";
  
  return [
    {
      destination: direction,
      time: new Date(currentTime.getTime() + 2 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      platform: 1,
    },
    {
      destination: direction,
      time: new Date(currentTime.getTime() + 7 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      platform: 1,
    },
    {
      destination: direction === "Kanpur Central" ? "IIT Kanpur" : "Kanpur Central",
      time: new Date(currentTime.getTime() + 4 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      platform: 2,
    },
  ];
}

// Calculate fare based on cumulative distance (Kanpur Metro Official Fare Structure)
// Accurate fare slabs based on cumulative distance from IIT Kanpur
export function calculateFare(distanceInKm: number): { fare: number; smartCardFare: number } {
  let fare = 0;
  
  // Accurate Kanpur Metro Fare Slabs based on cumulative distance
  // ₹10: 0 - 2.559 km (up to SPM Hospital)
  // ₹15: 2.56 - 4.187 km (up to Gurudev Chauraha)
  // ₹20: 4.188 - 8.98 km (up to Moti Jheel)
  // ₹30: 8.981 - 12.43 km (up to Bada Chauraha)
  // ₹40: 12.431 - 16 km (up to Kanpur Central)
  
  if (distanceInKm <= 2.559) {
    fare = 10;              // 0 - 2.559 km → ₹10
  } else if (distanceInKm <= 4.187) {
    fare = 15;              // 2.56 - 4.187 km → ₹15
  } else if (distanceInKm <= 8.98) {
    fare = 20;              // 4.188 - 8.98 km → ₹20
  } else if (distanceInKm <= 12.43) {
    fare = 30;              // 8.981 - 12.43 km → ₹30
  } else {
    fare = 40;              // 12.431+ km → ₹40
  }
  
  // Smart card gives 10% discount
  const smartCardFare = Math.floor(fare * 0.9);
  
  return { fare, smartCardFare };
}

// Accurate inter-station distances for Kanpur Metro Orange Line (in km)
// Based on Official Kanpur Metro Orange Line Data - Total 16 km
// Cumulative distance from IIT Kanpur to each station
const cumulativeDistances: { [key: number]: number } = {
  1: 0,      // IIT Kanpur
  2: 1.454,  // Kalyanpur
  3: 2.559,  // SPM Hospital
  4: 3.44,   // Vishwavidyalaya
  5: 4.187,  // Gurudev Chauraha
  6: 5.273,  // Geeta Nagar
  7: 6.856,  // Rawatpur
  8: 8.194,  // LLR Hospital
  9: 8.98,   // Motijheel
  10: 10.18, // Chunniganj
  11: 11.28, // Naveen Market
  12: 12.43, // Bada Chauraha
  13: 13.43, // Nayaganj
  14: 16.0,  // Kanpur Central
};

// Inter-station distances (accurate official data from Kanpur Metro)
const interStationDistances: { [key: string]: number } = {
  "1-2": 1.454,  // IIT Kanpur to Kalyanpur
  "2-3": 1.105,  // Kalyanpur to SPM Hospital
  "3-4": 0.881,  // SPM Hospital to Vishwavidyalaya
  "4-5": 0.747,  // Vishwavidyalaya to Gurudev Chauraha
  "5-6": 1.086,  // Gurudev Chauraha to Geeta Nagar
  "6-7": 1.583,  // Geeta Nagar to Rawatpur
  "7-8": 1.338,  // Rawatpur to LLR Hospital
  "8-9": 0.786,  // LLR Hospital to Motijheel
  "9-10": 1.2,   // Motijheel to Chunniganj
  "10-11": 1.1,  // Chunniganj to Naveen Market
  "11-12": 1.15, // Naveen Market to Bada Chauraha
  "12-13": 1.0,  // Bada Chauraha to Nayaganj
  "13-14": 2.57, // Nayaganj to Kanpur Central
};

// Calculate distance between stations
export function calculateDistanceBetweenStations(sourceId: number, destinationId: number): number {
  const start = Math.min(sourceId, destinationId);
  const end = Math.max(sourceId, destinationId);
  
  let totalDistance = 0;
  
  // Sum up distances between consecutive stations
  for (let i = start; i < end; i++) {
    const key = `${i}-${i + 1}`;
    totalDistance += interStationDistances[key] || 0.7;
  }
  
  return parseFloat(totalDistance.toFixed(1));
}

// Get stations between source and destination
export function getStationsBetween(sourceId: number, destinationId: number): Station[] {
  const start = Math.min(sourceId, destinationId);
  const end = Math.max(sourceId, destinationId);
  
  // Sort stations based on the direction of travel
  const stationsBetween = orangeLineStations.filter(station => 
    station.id >= start && station.id <= end
  );
  
  // If traveling in reverse direction (from higher ID to lower ID)
  // we need to reverse the array of stations
  return sourceId > destinationId ? [...stationsBetween].reverse() : stationsBetween;
}

// Calculate travel time
export function calculateTravelTime(distanceInKm: number, sourceId: number, destinationId: number): number {
  // Average speed: ~34.3 km/h for Kanpur Metro (16km end-to-end in ~28 mins)
  // Station stop time: 20-30 seconds average
  const avgSpeedInKmPerMin = 34.3 / 60; // ~0.57 km/min
  const travelTimeInMinutes = distanceInKm / avgSpeedInKmPerMin;
  
  // Number of intermediate stops (excluding source and destination)
  const numberOfStops = Math.abs(destinationId - sourceId) - 1;
  const stationStopTimeInMinutes = numberOfStops * 0.5; // 30 seconds per stop
  
  return Math.ceil(travelTimeInMinutes + stationStopTimeInMinutes);
}

  // Get a complete route
export function getRoute(sourceId: number, destinationId: number): Route {
  const source = orangeLineStations.find(station => station.id === sourceId)!;
  const destination = orangeLineStations.find(station => station.id === destinationId)!;
  const distance = calculateDistanceBetween(sourceId, destinationId);
  const { fare, smartCardFare } = calculateFare(distance);
  const duration = calculateTravelTime(distance, sourceId, destinationId);
  
  // Get stations and determine direction based on IDs
  // Lower ID stations are towards IIT Kanpur (west)
  // Higher ID stations are towards Kanpur Central (east)
  const travelingEast = sourceId < destinationId;
  
  // Get stations in proper order based on direction
  const stationsBetween = getStationsBetween(sourceId, destinationId);
  
  // Determine direction text based on end points
  const direction = travelingEast 
    ? "Towards Kanpur Central"  // Going east (higher station ID)
    : "Towards IIT Kanpur";  // Going west (lower station ID)
  
  // Determine platform based on direction
  // Platform 1 is for eastbound trains (towards Kanpur Central)
  // Platform 2 is for westbound trains (towards IIT Kanpur)
  const platformNumber = travelingEast ? 1 : 2;
  
  return {
    source,
    destination,
    stations: stationsBetween,
    direction,
    distance,
    duration,
    fare,
    smartCardFare,
    platformNumber,
  };
}

// Helper function for calculating distance
export function calculateDistanceBetween(sourceId: number, destinationId: number): number {
  return calculateDistanceBetweenStations(sourceId, destinationId);
}

// Add alias export for backward compatibility
export const stations = orangeLineStations;
