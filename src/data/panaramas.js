// src/data/panoramas.js
export const campusTourScenes = {
  // --- Section 1: Gate 2, Temple & Walkway ---
  node_07: {
    id: 'node_07',
    title: 'Main Gate 2 Entrance',
    url: '/assets/panoramas/image_7.png',
    hotspots: [{ yaw: 0.15, pitch: -0.05, label: 'Temple Plaza ➔', target: 'node_08' }]
  },
  node_08: {
    id: 'node_08',
    title: 'Temple Plaza & Front Deck',
    url: '/assets/panoramas/image_8.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Gate 2 ➔', target: 'node_07' },
      { yaw: 0.15, pitch: -0.05, label: 'Central Walkway ➔', target: 'node_09' }
    ]
  },
  node_09: {
    id: 'node_09',
    title: 'Central Walkway North',
    url: '/assets/panoramas/image_9.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Temple ➔', target: 'node_08' },
      { yaw: 0.10, pitch: -0.05, label: 'Division Junction ➔', target: 'node_10' }
    ]
  },
  node_10: {
    id: 'node_10',
    title: 'Main Division Junction (Mandir/Admin/Canteen/H-Block)',
    url: '/assets/panoramas/image_10.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Central Walkway ➔', target: 'node_09' },
      { yaw: -0.85, pitch: -0.04, label: 'Main Building Front ➔', target: 'node_18' },
      { yaw: 0.20, pitch: -0.04, label: 'Roundabout 9 / H-Block ➔', target: 'node_11' },
      { yaw: 1.15, pitch: -0.04, label: 'Canteen Way ➔', target: 'node_13' }
    ]
  },

  // --- Section 2: Roundabout 9 & Academic Junction ---
  node_11: {
    id: 'node_11',
    title: 'Roundabout 9 (H-Block / BBDNIIT Circle)',
    url: '/assets/panoramas/image_11.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Division Junction ➔', target: 'node_10' },
      { yaw: 0.10, pitch: -0.05, label: 'Academic Junction ➔', target: 'node_12' },
      { yaw: -0.70, pitch: -0.05, label: 'H-Block Corridor ➔', target: 'node_32' }
    ]
  },
  node_12: {
    id: 'node_12',
    title: 'Academic Inner Way',
    url: '/assets/panoramas/image_12.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Roundabout 9 ➔', target: 'node_11' },
      { yaw: 0.20, pitch: -0.05, label: 'Auditorium Approach ➔', target: 'node_39' }
    ]
  },

  // --- Section 3: Canteen & Food Court Area ---
  node_13: {
    id: 'node_13',
    title: 'Canteen Approach Lane',
    url: '/assets/panoramas/image_13.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Division Junction ➔', target: 'node_10' },
      { yaw: 0.10, pitch: -0.05, label: 'Canteen Outdoor Plaza ➔', target: 'node_14' }
    ]
  },
  node_14: {
    id: 'node_14',
    title: 'Canteen Outdoor Plaza',
    url: '/assets/panoramas/image_14.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Pathway ➔', target: 'node_13' },
      { yaw: 0.15, pitch: -0.05, label: 'Canteen Hall ➔', target: 'node_15' }
    ]
  },
  node_15: {
    id: 'node_15',
    title: 'Canteen Dining Hall',
    url: '/assets/panoramas/image_15.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Plaza ➔', target: 'node_14' },
      { yaw: 0.10, pitch: -0.05, label: 'Canteen Back Exit ➔', target: 'node_16' }
    ]
  },
  node_16: {
    id: 'node_16',
    title: 'Canteen Back Perimeter Road',
    url: '/assets/panoramas/image_16.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Canteen Hall ➔', target: 'node_15' },
      { yaw: 0.20, pitch: -0.05, label: 'Hostel Ring Road ➔', target: 'node_17' }
    ]
  },
  node_17: {
    id: 'node_17',
    title: 'Campus Ring Road',
    url: '/assets/panoramas/image_17.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Canteen Rear ➔', target: 'node_16' },
      { yaw: 0.10, pitch: -0.05, label: 'High-Voltage Pylon Gate ➔', target: 'node_19' }
    ]
  },

  // --- Section 4: Main Building, Lawns & Interior ---
  node_18: {
    id: 'node_18',
    title: 'Main Building Front Palm Lawns',
    url: '/assets/panoramas/image_18.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Division Junction ➔', target: 'node_10' },
      { yaw: 0.10, pitch: -0.05, label: 'Main Building Parking ➔', target: 'node_24' }
    ]
  },
  node_19: {
    id: 'node_19',
    title: 'High-Voltage Pylon Gate Point',
    url: '/assets/panoramas/image_19.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Ring Road ➔', target: 'node_17' },
      { yaw: 0.15, pitch: -0.05, label: 'Girls Hostel Gate ➔', target: 'node_20' }
    ]
  },
  node_20: {
    id: 'node_20',
    title: 'Girls Hostel Perimeter & Gate',
    url: '/assets/panoramas/image_20.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Pylon Gate ➔', target: 'node_19' },
      { yaw: 0.10, pitch: -0.05, label: 'Hostel Courtyard ➔', target: 'node_21' }
    ]
  },
  node_21: {
    id: 'node_21',
    title: 'Girls Hostel Inner Walkway',
    url: '/assets/panoramas/image_21.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Gate ➔', target: 'node_20' },
      { yaw: 0.15, pitch: -0.05, label: 'Rear Lawns ➔', target: 'node_22' }
    ]
  },
  node_22: {
    id: 'node_22',
    title: 'Main Building Rear Courtyard',
    url: '/assets/panoramas/image_22.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Hostel Way ➔', target: 'node_21' },
      { yaw: 0.20, pitch: -0.05, label: 'Back Door Ramp ➔', target: 'node_23' }
    ]
  },
  node_23: {
    id: 'node_23',
    title: 'Main Building Back Door & Ramp',
    url: '/assets/panoramas/image_23.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Rear Courtyard ➔', target: 'node_22' },
      { yaw: 0.10, pitch: -0.05, label: 'Faculty Parking ➔', target: 'node_24' }
    ]
  },
  node_24: {
    id: 'node_24',
    title: 'Main Building Faculty Parking',
    url: '/assets/panoramas/image_24.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Back Door ➔', target: 'node_23' },
      { yaw: 0.10, pitch: -0.05, label: 'Grand Portico Ramp ➔', target: 'node_25' }
    ]
  },
  node_25: {
    id: 'node_25',
    title: 'Main Building Entrance Ramp',
    url: '/assets/panoramas/image_25.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Parking ➔', target: 'node_24' },
      { yaw: 0.15, pitch: -0.05, label: 'Upper Deck Plaza ➔', target: 'node_26' }
    ]
  },
  node_26: {
    id: 'node_26',
    title: 'Main Building Upper Deck',
    url: '/assets/panoramas/image_26.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Ramp ➔', target: 'node_25' },
      { yaw: 0.10, pitch: -0.05, label: 'Grand Central Plaza ➔', target: 'node_27' }
    ]
  },
  node_27: {
    id: 'node_27',
    title: 'Main Building Grand Plaza',
    url: '/assets/panoramas/image_27.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Upper Deck ➔', target: 'node_26' },
      { yaw: 0.05, pitch: -0.05, label: 'Founder Statue Entry ➔', target: 'node_28' }
    ]
  },
  node_28: {
    id: 'node_28',
    title: 'Founder Statue & Entrance Portico',
    url: '/assets/panoramas/image_28.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Grand Plaza ➔', target: 'node_27' },
      { yaw: 0.00, pitch: -0.02, label: 'Main University Signboard ➔', target: 'node_29' },
      { yaw: 0.80, pitch: -0.02, label: 'Enter Main Atrium ➔', target: 'node_30' }
    ]
  },
  node_29: {
    id: 'node_29',
    title: 'BBD University Official Signboard',
    url: '/assets/panoramas/image_29.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Founder Statue ➔', target: 'node_28' }
    ]
  },
  node_30: {
    id: 'node_30',
    title: 'Main Central Atrium (Inside Main Building)',
    url: '/assets/panoramas/image_30.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Portico Exit ➔', target: 'node_28' },
      { yaw: 0.10, pitch: -0.05, label: 'Academic Corridor ➔', target: 'node_31' }
    ]
  },
  node_31: {
    id: 'node_31',
    title: 'Main Building Academic Corridor',
    url: '/assets/panoramas/image_31.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Central Atrium ➔', target: 'node_30' }
    ]
  },

  // --- Section 5: H-Block, Pharmacy & Bus Stand ---
  node_32: {
    id: 'node_32',
    title: 'Junction 7 (H-Block Approach)',
    url: '/assets/panoramas/image_32.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Roundabout 9 ➔', target: 'node_11' },
      { yaw: 0.10, pitch: -0.05, label: 'H-Block Pathway ➔', target: 'node_33' }
    ]
  },
  node_33: {
    id: 'node_33',
    title: 'H-Block Outer Pathway',
    url: '/assets/panoramas/image_33.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Junction 7 ➔', target: 'node_32' },
      { yaw: 0.15, pitch: -0.05, label: 'H-Block Quad ➔', target: 'node_34' }
    ]
  },
  node_34: {
    id: 'node_34',
    title: 'H-Block Central Parking',
    url: '/assets/panoramas/image_34.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Outer Pathway ➔', target: 'node_33' },
      { yaw: 0.10, pitch: -0.05, label: 'Pharmacy Front ➔', target: 'node_35' }
    ]
  },
  node_35: {
    id: 'node_35',
    title: 'School of Pharmacy Forecourt',
    url: '/assets/panoramas/image_35.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Parking ➔', target: 'node_34' },
      { yaw: 0.05, pitch: -0.05, label: 'Pharmacy Main Entrance ➔', target: 'node_36' }
    ]
  },
  node_36: {
    id: 'node_36',
    title: 'School of Pharmacy Entrance',
    url: '/assets/panoramas/image_36.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Forecourt ➔', target: 'node_35' },
      { yaw: 0.00, pitch: -0.02, label: 'Pharmacy Lobby ➔', target: 'node_37' }
    ]
  },
  node_37: {
    id: 'node_37',
    title: 'Pharmacy Lobby & Notice Board',
    url: '/assets/panoramas/image_37.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Exit ➔', target: 'node_36' },
      { yaw: 0.50, pitch: -0.04, label: 'Campus Bus Stand ➔', target: 'node_38' }
    ]
  },
  node_38: {
    id: 'node_38',
    title: 'Campus Bus Parking Stand',
    url: '/assets/panoramas/image_38.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Pharmacy ➔', target: 'node_37' }
    ]
  },

  // --- Section 6: Auditorium & Cricket Stadium ---
  node_39: {
    id: 'node_39',
    title: 'Auditorium Approach Road',
    url: '/assets/panoramas/image_39.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Academic Junction ➔', target: 'node_12' },
      { yaw: 0.15, pitch: -0.05, label: 'Auditorium Front Road ➔', target: 'node_40' }
    ]
  },
  node_40: {
    id: 'node_40',
    title: 'Auditorium Connector Curve',
    url: '/assets/panoramas/image_40.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Approach Road ➔', target: 'node_39' },
      { yaw: 0.10, pitch: -0.05, label: 'Auditorium Forecourt ➔', target: 'node_41' }
    ]
  },
  node_41: {
    id: 'node_41',
    title: 'Auditorium Forecourt',
    url: '/assets/panoramas/image_41.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Connector Curve ➔', target: 'node_40' },
      { yaw: 0.10, pitch: -0.05, label: 'Auditorium Main Facade ➔', target: 'node_42' }
    ]
  },
  node_42: {
    id: 'node_42',
    title: 'Dr. Akhilesh Das Gupta Auditorium Entrance',
    url: '/assets/panoramas/image_42.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Forecourt ➔', target: 'node_41' },
      { yaw: 0.05, pitch: -0.02, label: 'Auditorium Foyer ➔', target: 'node_43' },
      { yaw: 0.85, pitch: -0.04, label: 'Cricket Stadium Outer Gates ➔', target: 'node_46' }
    ]
  },
  node_43: {
    id: 'node_43',
    title: 'Auditorium Foyer & Reception',
    url: '/assets/panoramas/image_43.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Outside ➔', target: 'node_42' },
      { yaw: 0.00, pitch: -0.02, label: 'Auditorium Seating Hall ➔', target: 'node_44' }
    ]
  },
  node_44: {
    id: 'node_44',
    title: 'Auditorium Seating & Balcony',
    url: '/assets/panoramas/image_44.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Foyer ➔', target: 'node_43' },
      { yaw: 0.00, pitch: -0.02, label: 'Main Stage ➔', target: 'node_45' }
    ]
  },
  node_45: {
    id: 'node_45',
    title: 'Auditorium Main Stage View',
    url: '/assets/panoramas/image_45.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Seating Hall ➔', target: 'node_44' }
    ]
  },
  node_46: {
    id: 'node_46',
    title: 'Cricket Stadium Outer Gates',
    url: '/assets/panoramas/image_46.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Auditorium ➔', target: 'node_42' },
      { yaw: 0.15, pitch: -0.05, label: 'Stadium Pavilion Plaza ➔', target: 'node_47' }
    ]
  },
  node_47: {
    id: 'node_47',
    title: 'Stadium Pavilion Plaza',
    url: '/assets/panoramas/image_47.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Outer Gates ➔', target: 'node_46' },
      { yaw: 0.10, pitch: -0.05, label: 'Grandstand Gate ➔', target: 'node_48' }
    ]
  },
  node_48: {
    id: 'node_48',
    title: 'Stadium Grandstand Gate',
    url: '/assets/panoramas/image_48.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Pavilion Plaza ➔', target: 'node_47' },
      { yaw: 0.10, pitch: -0.05, label: 'Indoor Lounge ➔', target: 'node_49' }
    ]
  },
  node_49: {
    id: 'node_49',
    title: 'Stadium Indoor Lounge',
    url: '/assets/panoramas/image_49.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Gate ➔', target: 'node_48' },
      { yaw: 0.10, pitch: -0.05, label: 'Pavilion Deck ➔', target: 'node_50' }
    ]
  },
  node_50: {
    id: 'node_50',
    title: 'Stadium Pavilion Upper Deck',
    url: '/assets/panoramas/image_50.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Lounge ➔', target: 'node_49' },
      { yaw: 0.10, pitch: -0.05, label: 'Pitch Boundary ➔', target: 'node_51' }
    ]
  },
  node_51: {
    id: 'node_51',
    title: 'Cricket Ground Boundary Rope',
    url: '/assets/panoramas/image_51.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Pavilion Deck ➔', target: 'node_50' },
      { yaw: 0.10, pitch: -0.05, label: 'Pitch Center ➔', target: 'node_52' }
    ]
  },
  node_52: {
    id: 'node_52',
    title: 'Cricket Ground Pitch & 360 Arena',
    url: '/assets/panoramas/image_52.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Boundary ➔', target: 'node_51' },
      { yaw: 1.50, pitch: -0.04, label: 'Outfield East ➔', target: 'node_53' }
    ]
  },
  node_53: {
    id: 'node_53',
    title: 'Stadium Outfield East',
    url: '/assets/panoramas/image_53.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Pitch ➔', target: 'node_52' },
      { yaw: 0.20, pitch: -0.05, label: 'Stadium North Gate ➔', target: 'node_54' }
    ]
  },
  node_54: {
    id: 'node_54',
    title: 'Stadium North Gate',
    url: '/assets/panoramas/image_54.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Outfield ➔', target: 'node_53' },
      { yaw: 0.10, pitch: -0.05, label: 'Volleyball Courts Road ➔', target: 'node_55' }
    ]
  },

  // --- Section 7: Sports Grounds & Boys Hostel ---
  node_55: {
    id: 'node_55',
    title: 'Volleyball Court Lane',
    url: '/assets/panoramas/image_55.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Stadium North Gate ➔', target: 'node_54' },
      { yaw: 0.10, pitch: -0.05, label: 'Volleyball Court View ➔', target: 'node_56' }
    ]
  },
  node_56: {
    id: 'node_56',
    title: 'Volleyball Courts',
    url: '/assets/panoramas/image_56.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Lane ➔', target: 'node_55' },
      { yaw: 0.15, pitch: -0.05, label: 'Stadium Wall & Gate 9 ➔', target: 'node_57' }
    ]
  },
  node_57: {
    id: 'node_57',
    title: 'Stadium Outer Wall (Gate 9)',
    url: '/assets/panoramas/image_57.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Volleyball Courts ➔', target: 'node_56' },
      { yaw: 0.20, pitch: -0.05, label: 'Boys Hostel Approach ➔', target: 'node_58' }
    ]
  },
  node_58: {
    id: 'node_58',
    title: 'Boys Hostel Approach Road',
    url: '/assets/panoramas/image_58.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Gate 9 ➔', target: 'node_57' },
      { yaw: 0.10, pitch: -0.05, label: 'Boys Hostel Main Entrance ➔', target: 'node_59' }
    ]
  },
  node_59: {
    id: 'node_59',
    title: 'BBD Boys Hostel Main Entrance',
    url: '/assets/panoramas/image_59.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Approach Road ➔', target: 'node_58' },
      { yaw: 0.05, pitch: -0.05, label: 'Hostel Sports Quadrangle ➔', target: 'node_60' }
    ]
  },
  node_60: {
    id: 'node_60',
    title: 'Hostel Basketball & Badminton Courts',
    url: '/assets/panoramas/image_60.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Hostel Main Entrance ➔', target: 'node_59' }
    ]
  }
};