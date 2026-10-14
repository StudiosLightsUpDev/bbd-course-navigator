import db from './db.js';

const buildings = [
  { id: 'gate2', name: 'Main Gate 2', category: 'Entry', description: 'South-West entry gate near Mandir and Block 2.', x: 0, z: 40, scene_id: 'gate_2' },
  { id: 'admin', name: 'Main Administrative Building (18/19)', category: 'Administration', description: 'Central dome building with grand plaza, Chancellor office, and founder statue.', x: -32, z: -14, scene_id: 'b19_grand_entrance' },
  { id: 'canteen', name: 'Canteen & Food Court (Block 4)', category: 'Dining', description: 'Food court with indoor dining hall and Dominos outlet.', x: -8, z: -30, scene_id: 'canteen_inside' },
  { id: 'aud', name: 'Dr. Akhilesh Das Gupta Auditorium (12)', category: 'Auditorium', description: 'Large multi-tiered cultural hall with 1000+ seating and performance stage.', x: -8, z: -8, scene_id: 'audi_hall' },
  { id: 'sports', name: 'Dr. Akhilesh Das Gupta Stadium (14/15)', category: 'Sports', description: 'Cricket stadium with natural turf pitch and spectator pavilions.', x: 18, z: -42, scene_id: 'stadium_pavilion_terrace' },
  { id: 'b8', name: 'H-Block (Building 8)', category: 'Academics', description: 'School of Pharmacy, Herbal Garden, and Hotel Management.', x: 24, z: 6, scene_id: 'h_block_forecourt' },
  { id: 'girls_hostel', name: 'Girls Hostel Complex', category: 'Hostel', description: 'Residential wings located between Building 19 and 20.', x: -38, z: -34, scene_id: 'hostel_courtyard' },
  { id: 'boys_hostel', name: 'Boys Hostel A & B Block (16)', category: 'Hostel', description: 'Male student accommodation with basketball and sports courts.', x: 36, z: -24, scene_id: 'boys_hostel_courtyard' }
];

const insertBuilding = db.prepare('INSERT OR REPLACE INTO buildings (id, name, category, description, x, z, scene_id) VALUES (?, ?, ?, ?, ?, ?, ?)');
buildings.forEach(b => insertBuilding.run(b.id, b.name, b.category, b.description, b.x, b.z, b.scene_id));

const insertVenue = db.prepare('INSERT OR REPLACE INTO venues (id, name, status, current_event, start_time, end_time, scene_id) VALUES (?, ?, ?, ?, ?, ?, ?)');
insertVenue.run('aud', 'Dr. Akhilesh Das Gupta Auditorium', 2, 'Utkarsh Tech Expo 2026', '10:00 AM', '05:00 PM', 'audi_hall');
insertVenue.run('sports', 'Dr. Akhilesh Das Gupta Stadium', 0, 'Open for practice matches', '06:00 AM', '07:00 PM', 'stadium_pitch');

console.log("Database seeded successfully!");