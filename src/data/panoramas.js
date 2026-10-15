export const campusTourScenes = {
  gate_2: {
    id: 'gate_2',
    title: 'Main Gate 2 Entrance',
    url: '/assets/panoramas/image_7.png',
    hotspots: [
      { yaw: 0.15, pitch: -0.05, label: 'Temple & Building 2', target: 'temple' }
    ]
  },
  temple: {
    id: 'temple',
    title: 'Temple Plaza',
    url: '/assets/panoramas/image_8.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Gate 2 Entrance', target: 'gate_2' },
      { yaw: 0.20, pitch: -0.04, label: 'Central Walkway', target: 'central_walkway' }
    ]
  },
  central_walkway: {
    id: 'central_walkway',
    title: 'Central Walkway',
    url: '/assets/panoramas/image_9.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Temple', target: 'temple' },
      { yaw: 0.10, pitch: -0.04, label: 'Main Division Junction', target: 'main_junction' }
    ]
  },
  main_junction: {
    id: 'main_junction',
    title: 'Main Division Junction',
    url: '/assets/panoramas/image_10.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Back to Mandir', target: 'central_walkway' },
      { yaw: -0.85, pitch: -0.04, label: 'Main Building & Atrium', target: 'main_building' },
      { yaw: 0.25, pitch: -0.04, label: 'H-Block & Roundabout 9', target: 'circle_9' },
      { yaw: 1.10, pitch: -0.04, label: 'Canteen Road', target: 'canteen_approach' }
    ]
  },
  circle_9: {
    id: 'circle_9',
    title: 'Roundabout 9 (H-Block / BBDNIIT Circle)',
    url: '/assets/panoramas/image_11.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Back to Main Junction', target: 'main_junction' },
      { yaw: 0.15, pitch: -0.04, label: 'H-Block & Pharmacy', target: 'h_block' },
      { yaw: 1.25, pitch: -0.04, label: 'Auditorium Way', target: 'auditorium' }
    ]
  },
  canteen_approach: {
    id: 'canteen_approach',
    title: 'Canteen Way',
    url: '/assets/panoramas/image_13.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Main Junction', target: 'main_junction' },
      { yaw: 0.10, pitch: -0.05, label: 'Canteen Outdoor Plaza', target: 'canteen_plaza' }
    ]
  },
  canteen_plaza: {
    id: 'canteen_plaza',
    title: 'Canteen Outdoor Plaza',
    url: '/assets/panoramas/image_14.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Back to Pathway', target: 'canteen_approach' },
      { yaw: 0.15, pitch: -0.05, label: 'Canteen Dining Hall', target: 'canteen_hall' }
    ]
  },
  canteen_hall: {
    id: 'canteen_hall',
    title: 'Canteen Dining Hall',
    url: '/assets/panoramas/image_15.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Outdoor Plaza', target: 'canteen_plaza' }
    ]
  },
  h_block: {
    id: 'h_block',
    title: 'School of Pharmacy (H-Block)',
    url: '/assets/panoramas/image_36.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Roundabout 9', target: 'circle_9' }
    ]
  },
  main_building: {
    id: 'main_building',
    title: 'Main Building Grand Plaza',
    url: '/assets/panoramas/image_27.png',
    hotspots: [
      { yaw: 0.05, pitch: -0.05, label: 'Founder Statue & Entry', target: 'founder_statue' },
      { yaw: 3.14, pitch: -0.05, label: 'Exit to Main Junction', target: 'main_junction' }
    ]
  },
  founder_statue: {
    id: 'founder_statue',
    title: 'Founder Statue & Atrium Entrance',
    url: '/assets/panoramas/image_28.png',
    hotspots: [
      { yaw: 0.00, pitch: -0.02, label: 'Enter Main Atrium', target: 'atrium' },
      { yaw: 3.14, pitch: -0.05, label: 'Plaza Deck', target: 'main_building' }
    ]
  },
  atrium: {
    id: 'atrium',
    title: 'Main Central Atrium',
    url: '/assets/panoramas/image_30.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Exit to Portico', target: 'founder_statue' }
    ]
  },
  auditorium: {
    id: 'auditorium',
    title: 'Dr. Akhilesh Das Gupta Auditorium',
    url: '/assets/panoramas/image_42.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Roundabout 9', target: 'circle_9' },
      { yaw: 0.35, pitch: -0.04, label: 'Cricket Stadium', target: 'stadium' }
    ]
  },
  stadium: {
    id: 'stadium',
    title: 'Dr. Akhilesh Das Gupta Stadium',
    url: '/assets/panoramas/image_46.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Auditorium', target: 'auditorium' },
      { yaw: 0.50, pitch: -0.05, label: 'Cricket Pitch', target: 'pitch' },
      { yaw: 1.80, pitch: -0.04, label: 'Boys Hostel Road', target: 'boys_hostel' }
    ]
  },
  pitch: {
    id: 'pitch',
    title: 'Cricket Ground Pitch & Pavilion',
    url: '/assets/panoramas/image_52.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Stadium Entrance', target: 'stadium' }
    ]
  },
  boys_hostel: {
    id: 'boys_hostel',
    title: 'BBD Boys Hostel Entrance',
    url: '/assets/panoramas/image_59.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Stadium Road', target: 'stadium' },
      { yaw: 0.05, pitch: -0.05, label: 'Sports Quadrangle', target: 'hostel_court' }
    ]
  },
  hostel_court: {
    id: 'hostel_court',
    title: 'Hostel Basketball & Badminton Court',
    url: '/assets/panoramas/image_60.png',
    hotspots: [
      { yaw: 3.14, pitch: -0.05, label: 'Hostel Main Gate', target: 'boys_hostel' }
    ]
  }
};
