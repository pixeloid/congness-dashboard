import { Occasion } from '../types/occasions';

export const occasions: Occasion[] = [
  {
    id: 1,
    name: "Nemzetközi Orvosi Konferencia 2024",
    subtitle: "Innovációk az egészségügyben",
    description: "A legújabb orvosi technológiák és kutatási eredmények bemutatása",
    url: "https://medconf2024.hu",
    logo: "/logos/medconf.png",
    startDate: "2024-03-15",
    endDate: "2024-03-17",
    venue: {
      name: "Budapest Congress Center",
      address: "Budapest, Jagelló út 1-3, 1123",
      coordinates: {
        lat: 47.490131,
        lng: 19.023138
      },
      photo: "https://via.placeholder.com/150",
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
    logo: "/logos/techsummit.png",
    startDate: "2024-06-20",
    endDate: "2024-06-22",
    venue: {
      name: "Hungexpo",
      address: "Budapest, Albertirsai út 10, 1101",
      coordinates: {
        lat: 47.503341,
        lng: 19.098947
      },
      photo: "https://via.placeholder.com/150",
      description: "Magyarország legnagyobb kiállítási központja",
      url: "https://hungexpo.hu"
    },
    contact: {
      name: "Kiss Éva",
      email: "kiss.eva@techsummit.hu"
    }
  }
];