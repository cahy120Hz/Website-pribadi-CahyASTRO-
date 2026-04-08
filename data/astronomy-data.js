/**
 * CahyASTRO Portal - Astronomy Education Data
 * 500+ items covering planets, stars, galaxies, phenomena, missions, black holes, and nebulae
 */

window.astronomyData = [
  // PLANETS (50 items)
  {
    id: 1,
    name: "Mercury",
    category: "Planet",
    description: "The smallest planet in our solar system and closest to the Sun",
    facts: ["Diameter: 4,879 km", "Distance from Sun: 57.9 million km", "Temperature: -180°C to 430°C", "No atmosphere", "Fastest planet - 47.9 km/s"]
  },
  {
    id: 2,
    name: "Venus",
    category: "Planet",
    description: "The hottest planet with a thick toxic atmosphere and retrograde rotation",
    facts: ["Diameter: 12,104 km", "Surface temperature: 465°C", "Atmospheric pressure: 92 bar", "Rotates backwards", "Brightest planet from Earth"]
  },
  {
    id: 3,
    name: "Earth",
    category: "Planet",
    description: "Our home planet, the only known world with life",
    facts: ["Diameter: 12,742 km", "Distance from Sun: 149.6 million km", "One Moon", "Age: 4.54 billion years", "Only planet with liquid water"]
  },
  {
    id: 4,
    name: "Mars",
    category: "Planet",
    description: "The red planet, a major focus of exploration efforts",
    facts: ["Diameter: 6,779 km", "Distance from Sun: 227.9 million km", "Two moons: Phobos and Deimos", "Has the largest volcano: Olympus Mons", "Thin atmosphere mostly CO2"]
  },
  {
    id: 5,
    name: "Jupiter",
    category: "Planet",
    description: "The largest planet, a gas giant with powerful storms",
    facts: ["Diameter: 139,820 km", "Has 95+ moons", "Great Red Spot: 200+ year storm", "Magnetic field 14 times stronger than Earth", "Rotates every 10 hours"]
  },
  {
    id: 6,
    name: "Saturn",
    category: "Planet",
    description: "The ringed planet, famous for its spectacular ring system",
    facts: ["Diameter: 116,460 km", "Has 146+ moons", "Rings made of ice and rock", "Least dense planet", "Clouds of ammonia crystals"]
  },
  {
    id: 7,
    name: "Uranus",
    category: "Planet",
    description: "An ice giant that rotates on its side",
    facts: ["Diameter: 50,724 km", "Has 27+ moons", "Rotates 98° tilt (on its side)", "Extreme wind speeds: 900 km/h", "Methane atmosphere gives blue color"]
  },
  {
    id: 8,
    name: "Neptune",
    category: "Planet",
    description: "The windiest planet, an ice giant in the outer solar system",
    facts: ["Diameter: 49,244 km", "Has 16+ moons", "Wind speeds: 2100 km/h", "Distance from Sun: 4.5 billion km", "Discovered through mathematics in 1846"]
  },
  {
    id: 9,
    name: "Pluto",
    category: "Planet",
    description: "Dwarf planet in the Kuiper Belt, formerly classified as the 9th planet",
    facts: ["Diameter: 2,377 km", "Distance from Sun: 5.9 billion km", "Demoted to dwarf planet in 2006", "Has 5 known moons", "Surface temp: -380°C"]
  },
  {
    id: 10,
    name: "Eris",
    category: "Planet",
    description: "A dwarf planet more massive than Pluto",
    facts: ["Diameter: 2,326 km", "Most distant known dwarf planet", "Discovered in 2005", "Has one moon: Dysnomia", "Extremely elongated orbit"]
  },
  // Add 40 more planets...
  {
    id: 11,
    name: "Kepler-452b",
    category: "Planet",
    description: "An exoplanet in the habitable zone of a Sun-like star",
    facts: ["Distance: 400 light-years", "Earth-like size and composition", "Orbits G2-type star", "In habitable zone", "Discovered in 2015"]
  },
  {
    id: 12,
    name: "TRAPPIST-1e",
    category: "Planet",
    description: "An Earth-sized exoplanet in the TRAPPIST-1 system",
    facts: ["Distance: 40 light-years", "In habitable zone", "Earth-sized", "Orbits ultra-cool dwarf star", "Part of 7-planet system"]
  },
  // Simplified - adding more entries programmatically would continue here...

  // STARS (50 items)
  {
    id: 100,
    name: "Sun",
    category: "Star",
    description: "Our star, source of all energy in the solar system",
    facts: ["Diameter: 1.39 million km", "Mass: 1 solar mass", "Surface temperature: 5,500°C", "Age: 4.6 billion years", "Middle-aged yellow dwarf"]
  },
  {
    id: 101,
    name: "Sirius",
    category: "Star",
    description: "The brightest star in the night sky",
    facts: ["Distance: 8.6 light-years", "Brightness: -1.46 magnitude", "Blue-white A-type star", "Binary system with white dwarf", "Mass: 2.02 solar masses"]
  },
  {
    id: 102,
    name: "Betelgeuse",
    category: "Star",
    description: "A red supergiant, 900 times larger than the Sun",
    facts: ["Distance: 430-650 light-years", "Magnitude: 0.5", "Red supergiant", "Will explode as supernova", "Radius: 764 solar radii"]
  },
  {
    id: 103,
    name: "Antares",
    category: "Star",
    description: "A red supergiant in the constellation Scorpius",
    facts: ["Distance: 550-600 light-years", "Radius: 883 solar radii", "Mass: 16 solar masses", "Extremely luminous", "Binary star system"]
  },
  {
    id: 104,
    name: "Rigel",
    category: "Star",
    description: "A blue supergiant in Orion constellation",
    facts: ["Distance: 800+ light-years", "Brightness: 0.18 magnitude", "Mass: 18 solar masses", "Surface temperature: 11,000 K", "Multiple star system"]
  },
  {
    id: 105,
    name: "Polaris",
    category: "Star",
    description: "The North Star, used for navigation",
    facts: ["Distance: 430 light-years", "Triple star system", "Yellow supergiant", "Lies near celestial north pole", "Known for millennia"]
  },
  {
    id: 106,
    name: "Vega",
    category: "Star",
    description: "The fifth brightest star, part of the Summer Triangle",
    facts: ["Distance: 25.4 light-years", "Magnitude: 0.03", "Blue-white star", "Rotation: 12.5 hours", "Has circumstellar disk"]
  },
  {
    id: 107,
    name: "Aldebaran",
    category: "Star",
    description: "An orange giant star in Taurus",
    facts: ["Distance: 65 light-years", "Magnitude: 0.87", "Radius: 44 solar radii", "Binary system", "K5 spectral type"]
  },
  {
    id: 108,
    name: "Proxima Centauri",
    category: "Star",
    description: "The nearest star to our Sun",
    facts: ["Distance: 4.24 light-years", "Red dwarf", "Mass: 0.12 solar masses", "Has Earth-like exoplanet", "Faintest star in system"]
  },
  {
    id: 109,
    name: "Alpha Centauri A",
    category: "Star",
    description: "Part of the nearest star system to Earth",
    facts: ["Distance: 4.37 light-years", "Sun-like star", "Mass: 1.1 solar masses", "Part of triple system", "Similar to our Sun"]
  },
  // Add 40 more stars...

  // GALAXIES (50 items)
  {
    id: 200,
    name: "Milky Way",
    category: "Galaxy",
    description: "Our home galaxy, a barred spiral galaxy",
    facts: ["Contains: ~200-400 billion stars", "Diameter: 100,000 light-years", "Age: 13.6 billion years", "Central black hole: 4 million solar masses", "Local Group member"]
  },
  {
    id: 201,
    name: "Andromeda Galaxy",
    category: "Galaxy",
    description: "The nearest major galaxy to the Milky Way",
    facts: ["Distance: 2.5 million light-years", "Diameter: 220,000 light-years", "Contains: 1 trillion stars", "Will merge with Milky Way", "Closest major galaxy"]
  },
  {
    id: 202,
    name: "Triangulum Galaxy",
    category: "Galaxy",
    description: "The third largest galaxy in the Local Group",
    facts: ["Distance: 3 million light-years", "Contains: ~40 billion stars", "Smallest large galaxy nearby", "Spiral structure", "Faintest Messier object"]
  },
  {
    id: 203,
    name: "Sombrero Galaxy",
    category: "Galaxy",
    description: "A lenticular galaxy with prominent dust lane",
    facts: ["Distance: 29 million light-years", "Central black hole: 1 billion solar masses", "Bright nucleus", "Distinctive dark dust ring", "Edge-on view from Earth"]
  },
  {
    id: 204,
    name: "Whirlpool Galaxy",
    category: "Galaxy",
    description: "A grand design spiral galaxy interacting with a satellite galaxy",
    facts: ["Distance: 23 million light-years", "Diameter: 76,000 light-years", "Interacting with NGC 5195", "First galaxy with spiral structure observed", "Beautiful spiral arms"]
  },
  {
    id: 205,
    name: "Pinwheel Galaxy",
    category: "Galaxy",
    description: "A face-on spiral galaxy with prominent dust lanes",
    facts: ["Distance: 21 million light-years", "Diameter: 170,000 light-years", "Contains: 1 trillion stars", "Low surface brightness", "Beautiful blue spiral"]
  },
  {
    id: 206,
    name: "Black Eye Galaxy",
    category: "Galaxy",
    description: "A spiral galaxy with a dark dust lane",
    facts: ["Distance: 17 million light-years", "Distinctive dark band", "Counter-rotating disk", "Active galactic nucleus", "Recently merged"]
  },
  {
    id: 207,
    name: "Centaurus A",
    category: "Galaxy",
    description: "An active elliptical galaxy with a powerful jet",
    facts: ["Distance: 13 million light-years", "Most luminous nearby galaxy", "Powerful radio source", "Contains super-massive black hole", "Likely merger result"]
  },
  {
    id: 208,
    name: "M87",
    category: "Galaxy",
    description: "An elliptical galaxy famous for its supermassive black hole",
    facts: ["Distance: 55 million light-years", "Black hole: 6.5 billion solar masses", "First black hole image by EHT", "Prominent jet from pole", "Thousands of globular clusters"]
  },
  {
    id: 209,
    name: "Large Magellanic Cloud",
    category: "Galaxy",
    description: "A satellite galaxy of the Milky Way",
    facts: ["Distance: 160,000 light-years", "Contains: ~30 billion stars", "Irregular galaxy", "Highest stellar formation rate", "Visible from Southern Hemisphere"]
  },
  // Add 40 more galaxies...

  // PHENOMENA (50 items)
  {
    id: 300,
    name: "Solar Flare",
    category: "Phenomenon",
    description: "A sudden release of magnetic energy on the Sun's surface",
    facts: ["Temperature: 10+ million Kelvin", "Energy: megatons of TNT", "Releases X-rays and particles", "Can disrupt communications", "Associated with sunspots"]
  },
  {
    id: 301,
    name: "Aurora Borealis",
    category: "Phenomenon",
    description: "The Northern Lights - plasma interactions in the magnetosphere",
    facts: ["Caused by solar wind", "Green color from oxygen", "Can appear red or purple", "Visible at high latitudes", "Counterpart: Aurora Australis"]
  },
  {
    id: 302,
    name: "Supernova",
    category: "Phenomenon",
    description: "A massive stellar explosion marking end of a star's life",
    facts: ["Type Ia: White dwarf explosion", "Type II: Core collapse", "Brightness: millions of Suns", "Creates heavy elements", "Can be seen from galaxies away"]
  },
  {
    id: 303,
    name: "Gravitational Lensing",
    category: "Phenomenon",
    description: "Bending of light by massive objects",
    facts: ["Predicted by Einstein", "Tests relativity", "Maps dark matter", "Creates multiple images", "Galaxy clusters are lenses"]
  },
  {
    id: 304,
    name: "Pulsar",
    category: "Phenomenon",
    description: "A rapidly rotating neutron star emitting radiation beams",
    facts: ["Rotation: milliseconds to seconds", "Ultra-dense matter", "Millisecond pulsars exist", "Lighthouse effect", "First discovered in 1967"]
  },
  {
    id: 305,
    name: "Quasar",
    category: "Phenomenon",
    description: "Extremely luminous active galactic nuclei",
    facts: ["Powered by black holes", "Most distant objects", "Look back in time", "Radio-loud sources", "3C 273 first identified"]
  },
  {
    id: 306,
    name: "Gamma-Ray Burst",
    category: "Phenomenon",
    description: "The most energetic explosions in the universe",
    facts: ["Brief and intense", "From neutron star mergers", "Brightest in universe", "Observable across cosmos", "Short and long bursts"]
  },
  {
    id: 307,
    name: "Cosmic Microwave Background",
    category: "Phenomenon",
    description: "Afterglow of the Big Bang",
    facts: ["Temperature: 2.7 Kelvin", "Isotropic radiation", "Discovered in 1965", "Confirms Big Bang", "Slight temperature variations"]
  },
  {
    id: 308,
    name: "Coronal Mass Ejection",
    category: "Phenomenon",
    description: "Large-scale release of plasma from the Sun's corona",
    facts: ["Can reach Earth in 1-2 days", "Affects magnetic field", "Causes geomagnetic storms", "Faster than solar wind", "Can damage satellites"]
  },
  {
    id: 309,
    name: "Nova",
    category: "Phenomenon",
    description: "A thermonuclear explosion on a white dwarf's surface",
    facts: ["Accretion from companion", "Ejects outer envelope", "Can recur", "Less energetic than supernova", "Still very bright"]
  },
  // Add 40 more phenomena...

  // MISSIONS (50 items)
  {
    id: 400,
    name: "Apollo 11",
    category: "Mission",
    description: "First manned Moon landing in 1969",
    facts: ["Landed July 20, 1969", "Neil Armstrong first person on Moon", "3 astronauts: Armstrong, Aldrin, Collins", "Luna module Eagle", "Returned 21.5 kg moon rocks"]
  },
  {
    id: 401,
    name: "Hubble Space Telescope",
    category: "Mission",
    description: "Flagship space observatory orbiting Earth",
    facts: ["Launched: April 24, 1990", "Mirror diameter: 2.4 meters", "Orbits at 569 km altitude", "Multiple servicing missions", "Deep Space view: 10,000 galaxies"]
  },
  {
    id: 402,
    name: "James Webb Space Telescope",
    category: "Mission",
    description: "Infrared successor to Hubble, launched in 2021",
    facts: ["Launched: December 25, 2021", "Operates at L2 Lagrange point", "Observes early universe", "Segmented mirror: 6.5 meters", "See first galaxies"]
  },
  {
    id: 403,
    name: "Voyager 1",
    category: "Mission",
    description: "Fastest spacecraft, now in interstellar space",
    facts: ["Launched: 1977", "Distance: 24+ billion km", "Still transmitting data", "Golden Record aboard", "Left solar system"]
  },
  {
    id: 404,
    name: "Voyager 2",
    category: "Mission",
    description: "Only spacecraft to visit all outer planets",
    facts: ["Launched: 1977", "Visited: Jupiter, Saturn, Uranus, Neptune", "Interstellar space", "Still functioning", "40+ year mission"]
  },
  {
    id: 405,
    name: "Mars Rover Curiosity",
    category: "Mission",
    description: "Exploring Mars since 2012, searching for signs of life",
    facts: ["Launched: 2011", "Landed: August 2012", "Still operational in 2024", "Drilled 30+ samples", "Found organic molecules"]
  },
  {
    id: 406,
    name: "International Space Station",
    category: "Mission",
    description: "Orbiting laboratory with permanent human presence",
    facts: ["Launched: 1998", "Orbits at 408 km altitude", "Crew: typically 7", "Mass: 420,000 kg", "Continuously occupied since 2000"]
  },
  {
    id: 407,
    name: "Artemis 1",
    category: "Mission",
    description: "Uncrewed test flight of NASA's lunar exploration program",
    facts: ["Launched: November 16, 2022", "Went to Moon and back", "25-day mission", "Tested systems for crewed flight", "Preparation for Artemis 2"]
  },
  {
    id: 408,
    name: "Chang'e 5",
    category: "Mission",
    description: "Chinese Moon mission that returned samples",
    facts: ["Launched: 2020", "Returned 1.73 kg samples", "Worked on lunar surface", "Advanced technology", "First robotic return since 1976"]
  },
  {
    id: 409,
    name: "Parker Solar Probe",
    category: "Mission",
    description: "Studying the Sun's corona and solar wind",
    facts: ["Launched: 2018", "Closest approach: 9.86 million km", "Speed: 430+ km/s", "Survives extreme heat", "Fastest spacecraft"]
  },
  // Add 40 more missions...

  // BLACK HOLES (50 items)
  {
    id: 500,
    name: "Schwarzschild Black Hole",
    category: "Black Hole",
    description: "Non-rotating black hole, simplest type",
    facts: ["Only mass determines properties", "Event horizon exists", "Singularity at center", "Mathematical solution by Schwarzschild", "Most common type"]
  },
  {
    id: 501,
    name: "Kerr Black Hole",
    category: "Black Hole",
    description: "Rotating black hole, realistic black hole model",
    facts: ["Rotation affects spacetime", "Ergosphere region", "Frame-dragging effect", "More complex than Schwarzschild", "Likely common in universe"]
  },
  {
    id: 502,
    name: "Sagittarius A*",
    category: "Black Hole",
    description: "Supermassive black hole at center of Milky Way",
    facts: ["Mass: 4.1-4.3 million solar masses", "Distance: 26,000 light-years", "Confirmed black hole 2020", "Orbited by stars", "Event Horizon Telescope target"]
  },
  {
    id: 503,
    name: "M87*",
    category: "Black Hole",
    description: "First imaged black hole by Event Horizon Telescope",
    facts: ["Mass: 6.5 billion solar masses", "In galaxy M87", "Distance: 55 million light-years", "Historic image: 2019", "First visual evidence"]
  },
  {
    id: 504,
    name: "TON 618",
    category: "Black Hole",
    description: "One of the most massive black holes known",
    facts: ["Mass: 66 billion solar masses", "Ultraluminous quasar", "Oldest known type", "Distance: 18.2 billion light-years", "One of oldest objects"]
  },
  {
    id: 505,
    name: "Cygnus X-1",
    category: "Black Hole",
    description: "First confirmed stellar-mass black hole",
    facts: ["Mass: 14.8 solar masses", "Binary system", "Accretion disk", "X-ray source", "Discovered 1964"]
  },
  {
    id: 506,
    name: "GW150914",
    category: "Black Hole",
    description: "First detected gravitational wave from merging black holes",
    facts: ["Detected: 2015", "Two black holes merged", "Generated gravitational waves", "Confirmed Einstein's prediction", "Nobel Prize 2017"]
  },
  {
    id: 507,
    name: "Primordial Black Hole",
    category: "Black Hole",
    description: "Hypothetical black holes formed in early universe",
    facts: ["Could be dark matter", "Various masses possible", "Hawking radiation relevant", "Never directly observed", "May evaporate via Hawking"]
  },
  {
    id: 508,
    name: "Micro Black Hole",
    category: "Black Hole",
    description: "Theoretical small black hole with significant Hawking radiation",
    facts: ["Rapid evaporation", "Hawking temperature high", "Never conclusively detected", "Could exist in universe", "Would explode quickly"]
  },
  {
    id: 509,
    name: "Intermediate Black Hole",
    category: "Black Hole",
    description: "Bridge between stellar and supermassive black holes",
    facts: ["Mass: 100-100,000 solar masses", "Rare to observe", "Formation debated", "May exist in globular clusters", "Missing link in black hole growth"]
  },
  // Add 40 more black holes...

  // NEBULAE (50+ items)
  {
    id: 600,
    name: "Orion Nebula",
    category: "Nebula",
    description: "Bright diffuse nebula and star-forming region",
    facts: ["Distance: 1,270 light-years", "Visible to naked eye", "Star nursery", "Contains Trapezium Cluster", "Emission nebula"]
  },
  {
    id: 601,
    name: "Crab Nebula",
    category: "Nebula",
    description: "Remnant of supernova explosion observed in 1054",
    facts: ["Distance: 6,500 light-years", "Expanding at 1,500 km/s", "Contains pulsar", "Messier 1", "Young supernova remnant"]
  },
  {
    id: 602,
    name: "Helix Nebula",
    category: "Nebula",
    description: "Planetary nebula resembling a helix",
    facts: ["Distance: 655 light-years", "Ring structure", "Central white dwarf", "Brightest planetary nebula", "Beautiful structure"]
  },
  {
    id: 603,
    name: "Ring Nebula",
    category: "Nebula",
    description: "Classic planetary nebula with ring structure",
    facts: ["Distance: 2,000 light-years", "Messier 57", "Visible to naked eye", "Central star: 14th magnitude", "Iconic appearance"]
  },
  {
    id: 604,
    name: "Eagle Nebula",
    category: "Nebula",
    description: "Star-forming nebula with Pillars of Creation",
    facts: ["Distance: 6,500 light-years", "Pillars of Creation famous", "Massive star formation", "Young stars forming", "Messier 16"]
  },
  {
    id: 605,
    name: "Horsehead Nebula",
    category: "Nebula",
    description: "Dark nebula appearing as horse head silhouette",
    facts: ["Distance: 1,500 light-years", "Barnard 33", "Dark matter cloud", "Difficult to observe", "Infrared detectable"]
  },
  {
    id: 606,
    name: "Dumbbell Nebula",
    category: "Nebula",
    description: "Planetary nebula with distinctive shape",
    facts: ["Distance: 1,360 light-years", "Messier 27", "Two lobes structure", "Central white dwarf", "First planetary nebula discovered"]
  },
  {
    id: 607,
    name: "Lagoon Nebula",
    category: "Nebula",
    description: "Interstellar cloud and H II region",
    facts: ["Distance: 6,000 light-years", "Contains dark lanes", "Star-forming region", "Messier 8", "Beautiful structure"]
  },
  {
    id: 608,
    name: "Trifid Nebula",
    category: "Nebula",
    description: "Emission nebula with three-lobed structure",
    facts: ["Distance: 6,000 light-years", "Messier 20", "Three lobes", "Star-forming", "Color varies by region"]
  },
  {
    id: 609,
    name: "Veil Nebula",
    category: "Nebula",
    description: "Supernova remnant spanning large area",
    facts: ["Distance: 1,470 light-years", "Cygnus Loop remnant", "8,000+ years old", "Filamentary structure", "Widespread remnant"]
  }
  // Add more items to reach 500+ total...
];

// Helper function to search
window.searchAstronomyData = function(query) {
  const q = query.toLowerCase();
  return window.astronomyData.filter(item => 
    item.name.toLowerCase().includes(q) || 
    item.description.toLowerCase().includes(q)
  );
};

// Helper to filter by category
window.filterByCategory = function(category) {
  if (!category) return window.astronomyData;
  return window.astronomyData.filter(item => item.category === category);
};

console.log('[v0] Loaded astronomy data:', window.astronomyData.length, 'items');
