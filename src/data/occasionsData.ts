import { Occasion } from '../features/occasion/types/occasions';

export const occasions: Occasion[] = [
  {
    id: 1,
    name: "Nemzetközi Orvosi Konferencia 2024",
    subtitle: "Innovációk az egészségügyben",
    description: "A legújabb orvosi technológiák és kutatási eredmények bemutatása",
    url: "https://medconf2024.hu",
    logo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
    startDate: "2024-03-15",
    endDate: "2024-03-17",
    type: "conference",
    venue: {
      name: "Budapest Congress Center",
      address: "Budapest, Jagelló út 1-3, 1123",
      coordinates: {
        lat: 47.490131,
        lng: 19.023138
      },
      photo: "https://images.unsplash.com/photo-1582647509711-c8aa8eb7e48f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      description: "Modern konferenciaközpont a város szívében",
      url: "https://bcc.hu"
    },
    contact: {
      name: "Dr. Nagy János",
      email: "nagy.janos@medconf.hu"
    }
  },
  {
    id: 2,
    name: "Tech Summit Budapest",
    subtitle: "A jövő technológiái",
    description: "Technológiai újítások és digitális transzformáció",
    url: "https://techsummit.hu",
    logo: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
    startDate: "2024-06-20",
    endDate: "2024-06-22",
    type: "conference",
    venue: {
      name: "Hungexpo",
      address: "Budapest, Albertirsai út 10, 1101",
      coordinates: {
        lat: 47.503341,
        lng: 19.098947
      },
      photo: "https://images.unsplash.com/photo-1600267185393-e158a98703de?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      description: "Magyarország legnagyobb kiállítási központja",
      url: "https://hungexpo.hu"
    },
    contact: {
      name: "Kiss Éva",
      email: "kiss.eva@techsummit.hu"
    }
  },
  {
    id: 3,
    name: "AI Workshop Series",
    subtitle: "Hands-on Machine Learning",
    description: "Practical workshops on implementing AI solutions",
    url: "https://aiworkshops.hu",
    logo: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
    startDate: "2024-04-10",
    endDate: "2024-04-12",
    type: "workshop",
    venue: {
      name: "BME Q Building",
      address: "Budapest, Magyar tudósok körútja 2, 1117",
      coordinates: {
        lat: 47.481019,
        lng: 19.055494
      },
      photo: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      description: "Modern university facility",
      url: "https://www.bme.hu"
    },
    contact: {
      name: "Dr. Kovács Péter",
      email: "kovacs.peter@aiworkshops.hu"
    }
  },
  {
    id: 4,
    name: "Leadership Training Summit",
    subtitle: "Building Tomorrow's Leaders",
    description: "Intensive leadership development program",
    url: "https://leadershiptraining.hu",
    logo: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
    startDate: "2024-05-15",
    endDate: "2024-05-16",
    type: "training",
    venue: {
      name: "Corinthia Hotel",
      address: "Budapest, Erzsébet krt. 43-49, 1073",
      coordinates: {
        lat: 47.502315,
        lng: 19.06691
      },
      photo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      description: "Luxury hotel and conference center",
      url: "https://corinthia.com"
    },
    contact: {
      name: "Szabó Anna",
      email: "szabo.anna@leadershiptraining.hu"
    }
  },
  {
    id: 5,
    name: "Startup Weekend Budapest",
    subtitle: "From Idea to MVP in 54 Hours",
    description: "Intensive startup development weekend",
    url: "https://startupweekend.hu",
    logo: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
    startDate: "2024-07-05",
    endDate: "2024-07-07",
    type: "workshop",
    venue: {
      name: "Design Terminal",
      address: "Budapest, Kis Rókus u. 16-20, 1024",
      coordinates: {
        lat: 47.514691,
        lng: 19.02431
      },
      photo: "https://images.unsplash.com/photo-1497366412874-3415097a27e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      description: "Innovation hub and startup center",
      url: "https://designterminal.org"
    },
    contact: {
      name: "Tóth Márk",
      email: "toth.mark@startupweekend.hu"
    }
  },

  // 20 additional events:
  {
    id: 6,
    name: "Agile Project Management Workshop",
    subtitle: "Scrum and Kanban in Action",
    description: "Practical training sessions for agile teams",
    url: "https://agilebudapest.com",
    logo: "https://images.unsplash.com/photo-1600377506693-0084d2d95f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
    startDate: "2024-09-10",
    endDate: "2024-09-11",
    type: "workshop",
    venue: {
      name: "Budapest Marriott Hotel",
      address: "Budapest, Apáczai Csere János u. 4, 1052",
      coordinates: {
        lat: 47.495392,
        lng: 19.049889
      },
      photo: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      description: "Riverside venue with modern facilities",
      url: "https://www.marriott.com"
    },
    contact: {
      name: "Balogh Norbert",
      email: "balogh.norbert@agilebudapest.com"
    }
  },
  {
    id: 7,
    name: "FinTech Innovations 2024",
    subtitle: "Transforming Financial Services",
    description: "Exploring new technologies and their impact on finance",
    url: "https://fintechinnovations.hu",
    logo: "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
    startDate: "2024-10-12",
    endDate: "2024-10-13",
    type: "conference",
    venue: {
      name: "Millenáris Park",
      address: "Budapest, Kis Rókus u. 16-20, 1024",
      coordinates: {
        lat: 47.514691,
        lng: 19.024310
      },
      photo: "https://images.unsplash.com/photo-1598050223685-5c5a38408221?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      description: "Modern cultural center hosting technology events",
      url: "https://millenaris.hu"
    },
    contact: {
      name: "Horváth Ágnes",
      email: "agnes.horvath@fintechinnovations.hu"
    }
  },
  {
    id: 8,
    name: "GreenTech Fair 2025",
    subtitle: "Sustainable Innovations",
    description: "Showcasing eco-friendly and sustainable technology solutions",
    url: "https://greentechfair.hu",
    logo: "https://images.unsplash.com/photo-1596454704968-976f10260cd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
    startDate: "2025-03-05",
    endDate: "2025-03-07",
    type: "conference",
    venue: {
      name: "Budapest Fair Center",
      address: "Budapest, Vasútsor u. 12, 1180",
      coordinates: {
        lat: 47.450249,
        lng: 19.157482
      },
      photo: "https://images.unsplash.com/photo-1560265925-5c0e449470ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      description: "Exhibition grounds focused on sustainability",
      url: "https://budapestfaircenter.hu"
    },
    contact: {
      name: "Fekete Erzsébet",
      email: "fekete.erzsebet@greentechfair.hu"
    }
  },
  {
    id: 9,
    name: "Digital Marketing Masterclass",
    subtitle: "From Strategy to Execution",
    description: "Intensive training on SEO, PPC, and social media strategies",
    url: "https://digitalmasterclass.hu",
    logo: "https://images.unsplash.com/photo-1599577187063-128880dca80f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
    startDate: "2023-11-15",
    endDate: "2023-11-16",
    type: "training",
    venue: {
      name: "Lurdy Ház",
      address: "Budapest, Könyves Kálmán krt. 12-14, 1097",
      coordinates: {
        lat: 47.477464,
        lng: 19.085856
      },
      photo: "https://images.unsplash.com/photo-1603203304442-d3c951cfc2ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      description: "Business center and event space in Budapest",
      url: "https://lurdyhaz.hu"
    },
    contact: {
      name: "Molnár Tamás",
      email: "molnar.tamas@digitalmasterclass.hu"
    }
  },
  {
    id: 10,
    name: "Biotech Forum Budapest",
    subtitle: "Research and Innovation in Life Sciences",
    description: "Panel discussions and workshops on biotech breakthroughs",
    url: "https://biotechforum.hu",
    logo: "https://images.unsplash.com/photo-1579154203451-68bba2b45f44?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
    startDate: "2025-06-01",
    endDate: "2025-06-03",
    type: "conference",
    venue: {
      name: "Eötvös Loránd Tudományegyetem (ELTE)",
      address: "Budapest, Egyetem tér 1-3, 1053",
      coordinates: {
        lat: 47.487508,
        lng: 19.058883
      },
      photo: "https://images.unsplash.com/photo-1613054535667-a0f21ea8729c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      description: "Leading Hungarian university for life sciences research",
      url: "https://elte.hu"
    },
    contact: {
      name: "Varga Dóra",
      email: "varga.dora@biotechforum.hu"
    }
  },
  {
    id: 11,
    name: "IoT & Smart Cities Conference",
    subtitle: "Connected Solutions for Urban Environments",
    description: "Exploring IoT applications in smart city design",
    url: "https://iotconf.hu",
    logo: "https://images.unsplash.com/photo-1517411032315-5cec2f74eb58?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
    startDate: "2024-12-02",
    endDate: "2024-12-04",
    type: "conference",
    venue: {
      name: "Bálna Budapest",
      address: "Budapest, Fővám tér 11-12, 1093",
      coordinates: {
        lat: 47.485051,
        lng: 19.060892
      },
      photo: "https://images.unsplash.com/photo-1560265762-51f03ed9f5b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      description: "Modern cultural and commercial center on the Danube",
      url: "https://balnacentrum.hu"
    },
    contact: {
      name: "Németh Gábor",
      email: "nemeth.gabor@iotconf.hu"
    }
  },
  {
    id: 12,
    name: "Blockchain Business Conference",
    subtitle: "Distributed Ledger Innovations",
    description: "Focusing on real-world blockchain solutions for enterprises",
    url: "https://blockchainbiz.hu",
    logo: "https://images.unsplash.com/photo-1614891523333-9d4be7e11b0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
    startDate: "2024-02-05",
    endDate: "2024-02-06",
    type: "conference",
    venue: {
      name: "Európa Congress Center",
      address: "Budapest, Hárshegyi út 5, 1021",
      coordinates: {
        lat: 47.528980,
        lng: 18.994512
      },
      photo: "https://images.unsplash.com/photo-1581094277000-cf54b2dca04a?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      description: "Venue amidst the Buda hills, ideal for tech conferences",
      url: "https://europacc.hu"
    },
    contact: {
      name: "Török László",
      email: "torok.laszlo@blockchainbiz.hu"
    }
  },
  {
    id: 13,
    name: "Game Dev & Esports Expo",
    subtitle: "Celebrating the Future of Gaming",
    description: "Insights into the latest gaming trends and esports competitions",
    url: "https://gamedevexpo.hu",
    logo: "https://images.unsplash.com/photo-1607544832422-5cbbf6ecb02c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
    startDate: "2025-02-18",
    endDate: "2025-02-20",
    type: "conference",
    venue: {
      name: "SYMA Sport- és Rendezvényközpont",
      address: "Budapest, Dózsa György út 1, 1146",
      coordinates: {
        lat: 47.503162,
        lng: 19.097176
      },
      photo: "https://images.unsplash.com/photo-1581142375241-d3cdb7baa21f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      description: "Multi-purpose events center hosting gaming events",
      url: "https://syma.hu"
    },
    contact: {
      name: "Veres Patrik",
      email: "veres.patrik@gamedevexpo.hu"
    }
  },
  {
    id: 14,
    name: "Quantum Computing Hackathon",
    subtitle: "Shaping Next-Generation Computing",
    description: "Teams tackle quantum algorithms and coding challenges",
    url: "https://quantumhack.hu",
    logo: "https://images.unsplash.com/photo-1586712888439-cd3c90c81f65?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
    startDate: "2023-12-10",
    endDate: "2023-12-12",
    type: "conference",
    venue: {
      name: "MOME Campus",
      address: "Budapest, Zugligeti út 9-25, 1121",
      coordinates: {
        lat: 47.505900,
        lng: 18.995345
      },
      photo: "https://images.unsplash.com/photo-1580894894516-1c1e4ccef63a?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      description: "Design and innovation campus in the Buda hills",
      url: "https://mome.hu"
    },
    contact: {
      name: "Székely Katalin",
      email: "szekely.katalin@quantumhack.hu"
    }
  },
  {
    id: 15,
    name: "Cloud Computing Expo",
    subtitle: "Navigating the Future of IT Infrastructure",
    description: "Leading providers showcase cloud solutions and DevOps tools",
    url: "https://cloudexpo.hu",
    logo: "https://images.unsplash.com/photo-1544739313-6fad3dbce5e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
    startDate: "2024-03-20",
    endDate: "2024-03-21",
    type: "conference",
    venue: {
      name: "Hotel Gellért",
      address: "Budapest, Szent Gellért tér 2, 1114",
      coordinates: {
        lat: 47.484120,
        lng: 19.056222
      },
      photo: "https://images.unsplash.com/photo-1607544862567-4c73b98c8fe9?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      description: "Historic hotel with a grand conference area",
      url: "https://gellert.hu"
    },
    contact: {
      name: "Bodnár Mária",
      email: "bodnar.maria@cloudexpo.hu"
    }
  },
  {
    id: 16,
    name: "Future of Transportation Expo",
    subtitle: "Smart Mobility and Urban Planning",
    description: "Forum on electric, autonomous, and connected vehicle trends",
    url: "https://transportexpo.hu",
    logo: "https://images.unsplash.com/photo-1546593679-5c6bfa3e030c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
    startDate: "2024-08-10",
    endDate: "2024-08-12",
    type: "conference",
    venue: {
      name: "BOK Hall",
      address: "Budapest, Dózsa György út 1, 1146",
      coordinates: {
        lat: 47.503032,
        lng: 19.096453
      },
      photo: "https://images.unsplash.com/photo-1626339270063-23c6f803d250?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      description: "Exhibition space often used for technology and trade shows",
      url: "https://bokcsarnok.hu"
    },
    contact: {
      name: "Kelemen Márta",
      email: "kelemen.marta@transportexpo.hu"
    }
  },
  {
    id: 17,
    name: "VR/AR Innovation Day",
    subtitle: "Immersive Technologies in Business and Education",
    description: "Hands-on demos of virtual and augmented reality solutions",
    url: "https://vrarinnovation.hu",
    logo: "https://images.unsplash.com/photo-1611511909307-21a6ac10b583?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
    startDate: "2024-04-22",
    endDate: "2024-04-23",
    type: "conference",
    venue: {
      name: "Moholy-Nagy Művészeti Egyetem (MOME)",
      address: "Budapest, Zugligeti út 9-25, 1121",
      coordinates: {
        lat: 47.505900,
        lng: 18.995345
      },
      photo: "https://images.unsplash.com/photo-1581093898368-88aad18653d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      description: "Leading design university exploring tech innovation",
      url: "https://mome.hu"
    },
    contact: {
      name: "Tölgyesi Lilla",
      email: "tolgyesi.lilla@vrarinnovation.hu"
    }
  },
  {
    id: 18,
    name: "UX/UI Design Meetup",
    subtitle: "Enhancing Digital Product Experiences",
    description: "Interactive workshops on user-centered design best practices",
    url: "https://uxuidesignmeetup.hu",
    logo: "https://images.unsplash.com/photo-1555633515-59ee2ba28d4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
    startDate: "2023-10-05",
    endDate: "2023-10-06",
    type: "workshop",
    venue: {
      name: "Impact Hub Budapest",
      address: "Budapest, Ferenciek tere 2, 1053",
      coordinates: {
        lat: 47.495648,
        lng: 19.055288
      },
      photo: "https://images.unsplash.com/photo-1583425576990-345e31244871?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      description: "Community coworking space for tech and design professionals",
      url: "https://impacthub.net"
    },
    contact: {
      name: "Bakos Ádám",
      email: "bakos.adam@uxuidesignmeetup.hu"
    }
  },
  {
    id: 19,
    name: "Social Media Strategy Day",
    subtitle: "Maximizing Engagement and Reach",
    description: "Seminars on creating viral campaigns and social content",
    url: "https://smstrategy.hu",
    logo: "https://images.unsplash.com/photo-1551830824-ec5c0b2ec9f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
    startDate: "2025-07-15",
    endDate: "2025-07-16",
    type: "training",
    venue: {
      name: "Google Ground Budapest",
      address: "Budapest, 7. kerület, Király u. 8, 1061",
      coordinates: {
        lat: 47.498012,
        lng: 19.058364
      },
      photo: "https://images.unsplash.com/photo-1560264280-88b68371db30?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      description: "Tech event space for digital marketing workshops",
      url: "https://events.withgoogle.com"
    },
    contact: {
      name: "Kovács István",
      email: "kovacs.istvan@smstrategy.hu"
    }
  },
  {
    id: 20,
    name: "E-commerce Growth Summit",
    subtitle: "Scaling Online Businesses",
    description: "Tips and strategies for boosting online sales and conversions",
    url: "https://ecommercesummit.hu",
    logo: "https://images.unsplash.com/photo-1598715879353-a4f2d8d2353c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
    startDate: "2024-11-02",
    endDate: "2024-11-03",
    type: "conference",
    venue: {
      name: "New York Palace Budapest",
      address: "Budapest, Erzsébet krt. 9-11, 1073",
      coordinates: {
        lat: 47.497239,
        lng: 19.070061
      },
      photo: "https://images.unsplash.com/photo-1601442481688-c67c06c22f79?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      description: "Iconic luxury hotel and event space",
      url: "https://newyorkpalace.com"
    },
    contact: {
      name: "Orsós Ildikó",
      email: "orsos.ildiko@ecommercesummit.hu"
    }
  },
  {
    id: 21,
    name: "Human Resources Expo",
    subtitle: "Talent Acquisition and Retention Strategies",
    description: "Exploring modern HR practices in a changing workforce",
    url: "https://hrexpo.hu",
    logo: "https://images.unsplash.com/photo-1590608897129-cd00740647e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
    startDate: "2025-01-18",
    endDate: "2025-01-19",
    type: "conference",
    venue: {
      name: "Várkert Bazár",
      address: "Budapest, Ybl Miklós tér 2-6, 1013",
      coordinates: {
        lat: 47.496947,
        lng: 19.040189
      },
      photo: "https://images.unsplash.com/photo-1611496054822-0dca977fe4c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      description: "Historical venue overlooking the Danube",
      url: "https://varkertbazar.hu"
    },
    contact: {
      name: "Kelemen András",
      email: "kelemen.andras@hrexpo.hu"
    }
  },
  {
    id: 22,
    name: "EdTech Symposium",
    subtitle: "Technology in Education",
    description: "Discussion on e-learning platforms and digital teaching tools",
    url: "https://edtechsymposium.hu",
    logo: "https://images.unsplash.com/photo-1585776245991-dd3ba637f107?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
    startDate: "2024-01-12",
    endDate: "2024-01-13",
    type: "conference",
    venue: {
      name: "ELTE TTK",
      address: "Budapest, Pázmány Péter sétány 1/A, 1117",
      coordinates: {
        lat: 47.473148,
        lng: 19.058223
      },
      photo: "https://images.unsplash.com/photo-1593709421570-33f2c505051b?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      description: "Faculty of Science with modern lecture halls",
      url: "https://ttk.elte.hu"
    },
    contact: {
      name: "Novák Bea",
      email: "novak.bea@edtechsymposium.hu"
    }
  },
  {
    id: 23,
    name: "Art & Technology Expo",
    subtitle: "Where Creativity Meets Innovation",
    description: "Artists and technologists come together to display interactive projects",
    url: "https://artech expo.hu",
    logo: "https://images.unsplash.com/photo-1599491262312-2684c1c6783d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
    startDate: "2023-09-22",
    endDate: "2023-09-24",
    type: "conference",
    venue: {
      name: "Ludwig Múzeum",
      address: "Budapest, Komor Marcell u. 1, 1095",
      coordinates: {
        lat: 47.471365,
        lng: 19.067092
      },
      photo: "https://images.unsplash.com/photo-1533640238436-d0492f5fafd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      description: "Contemporary art museum hosting interdisciplinary events",
      url: "https://ludwigmuseum.hu"
    },
    contact: {
      name: "Szilágyi Fanni",
      email: "szilagyi.fanni@artech.hu"
    }
  },
  {
    id: 24,
    name: "FoodTech Budapest",
    subtitle: "The Future of Gastronomy",
    description: "Exploring innovations in food science and restaurant tech",
    url: "https://foodtechbp.hu",
    logo: "https://images.unsplash.com/photo-1587049352841-98c2b4431424?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
    startDate: "2025-04-25",
    endDate: "2025-04-26",
    type: "conference",
    venue: {
      name: "Akvárium Klub",
      address: "Budapest, Erzsébet tér 12, 1051",
      coordinates: {
        lat: 47.497913,
        lng: 19.054098
      },
      photo: "https://images.unsplash.com/photo-1598514984423-5737dfa2d7c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      description: "Cultural center hosting concerts and conferences",
      url: "https://akvariumklub.hu"
    },
    contact: {
      name: "Orosz Melinda",
      email: "orosz.melinda@foodtechbp.hu"
    }
  },
  {
    id: 25,
    name: "Urban Planning & Architecture Workshop",
    subtitle: "Designing Sustainable Cities",
    description: "Hands-on sessions on modern urban design principles",
    url: "https://urbanworkshop.hu",
    logo: "https://images.unsplash.com/photo-1597679046637-bd302177d220?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
    startDate: "2023-11-22",
    endDate: "2023-11-23",
    type: "workshop",
    venue: {
      name: "FUGA Budapesti Építészeti Központ",
      address: "Budapest, Petőfi Sándor u. 5, 1052",
      coordinates: {
        lat: 47.493087,
        lng: 19.053784
      },
      photo: "https://images.unsplash.com/photo-1573166857500-1e86c214d2da?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      description: "Architectural center hosting workshops and lectures",
      url: "https://fuga.org.hu"
    },
    contact: {
      name: "Fehér Gergely",
      email: "feher.gergely@urbanworkshop.hu"
    }
  },
  {
    id: 26,
    name: "Digital Wellbeing Conference",
    subtitle: "Balancing Life and Tech",
    description: "Exploring healthy digital habits and mental wellness in a tech-driven world",
    url: "https://digitalwellbeing.hu",
    logo: "https://images.unsplash.com/photo-1589505576528-61e382eea1e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
    startDate: "2024-05-15", // Overlaps on the same day
    endDate: "2024-05-15",
    type: "conference",
    venue: {
      name: "Ludwig Múzeum",
      address: "Budapest, Komor Marcell u. 1, 1095",
      coordinates: {
        lat: 47.471365,
        lng: 19.067092
      },
      photo: "https://images.unsplash.com/photo-1533640238436-d0492f5fafd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      description: "Contemporary art museum hosting interdisciplinary events",
      url: "https://ludwigmuseum.hu"
    },
    contact: {
      name: "Rácz Dénes",
      email: "racz.denes@digitalwellbeing.hu"
    }
  },
  {
    id: 27,
    name: "SaaS Solutions Summit",
    subtitle: "Cloud-based Innovations",
    description: "Highlights of the latest trends in Software-as-a-Service and enterprise cloud solutions",
    url: "https://saassummit.hu",
    logo: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
    startDate: "2024-05-15", // Overlaps on the same day
    endDate: "2024-05-15",
    type: "conference",
    venue: {
      name: "Hotel Gellért",
      address: "Budapest, Szent Gellért tér 2, 1114",
      coordinates: {
        lat: 47.484120,
        lng: 19.056222
      },
      photo: "https://images.unsplash.com/photo-1607544862567-4c73b98c8fe9?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      description: "Historic hotel with a grand conference area",
      url: "https://gellert.hu"
    },
    contact: {
      name: "Fodor Ágnes",
      email: "fodor.agnes@saassummit.hu"
    }
  },
  {
    id: 28,
    name: "Women in Tech Meetup",
    subtitle: "Empowering Female Innovators",
    description: "Networking sessions and talks on bridging the gender gap in tech",
    url: "https://womenintech.hu",
    logo: "https://images.unsplash.com/photo-1548946526-f69e2424cf45?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
    startDate: "2024-05-15", // Overlaps on the same day
    endDate: "2024-05-15",
    type: "workshop",
    venue: {
      name: "Impact Hub Budapest",
      address: "Budapest, Ferenciek tere 2, 1053",
      coordinates: {
        lat: 47.495648,
        lng: 19.055288
      },
      photo: "https://images.unsplash.com/photo-1583425576990-345e31244871?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      description: "Community coworking space for tech and design professionals",
      url: "https://impacthub.net"
    },
    contact: {
      name: "Barta Tímea",
      email: "barta.timea@womenintech.hu"
    }
  },
  {
    id: 29,
    name: "Diversity in Healthcare Forum",
    subtitle: "Inclusive Medical Innovations",
    description: "Roundtable discussions on equitable healthcare solutions for diverse populations",
    url: "https://healthcareforum.hu",
    logo: "https://images.unsplash.com/photo-1580281658628-3ed87f02db27?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
    startDate: "2024-05-15", // Overlaps on the same day
    endDate: "2024-05-15",
    type: "conference",
    venue: {
      name: "Budapest Congress Center",
      address: "Budapest, Jagelló út 1-3, 1123",
      coordinates: {
        lat: 47.490131,
        lng: 19.023138
      },
      photo: "https://images.unsplash.com/photo-1582647509711-c8aa8eb7e48f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      description: "Modern konferenciaközpont a város szívében",
      url: "https://bcc.hu"
    },
    contact: {
      name: "Mészáros Márk",
      email: "meszaros.mark@healthcareforum.hu"
    }
  },
  {
    id: 30,
    name: "Music Tech Live Showcase",
    subtitle: "Innovations in Audio and Performance",
    description: "A blend of music and technology featuring live demos and performances",
    url: "https://musictechlive.hu",
    logo: "https://images.unsplash.com/photo-1561600179-63d5f6e0830f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
    startDate: "2024-05-15", // Overlaps on the same day
    endDate: "2024-05-15",
    type: "conference",
    venue: {
      name: "Akvárium Klub",
      address: "Budapest, Erzsébet tér 12, 1051",
      coordinates: {
        lat: 47.497913,
        lng: 19.054098
      },
      photo: "https://images.unsplash.com/photo-1598514984423-5737dfa2d7c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      description: "Cultural center hosting concerts and conferences",
      url: "https://akvariumklub.hu"
    },
    contact: {
      name: "Katona Richárd",
      email: "katona.richard@musictechlive.hu"
    }
  }

];
