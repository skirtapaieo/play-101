// Demo data inspired by Freshservice
const DEMO_TICKETS = [
    {
        id: "SR-132",
        subject: "Wrike",
        description: "Hej, kan ni ge Stefan Molin access till Wrike, tänker även kolla upp MPs Wrike-licens.",
        requester: { name: "Patrik Svensson", email: "patrik.svensson@vectura.se" },
        priority: "Låg",
        status: "Stängd",
        source: "E-post",
        type: "Tjänsteförfrågan",
        urgency: "Låg",
        impact: "Låg",
        group: "MissionPoint",
        handler: "Jannica Svan",
        department: "IT",
        category: "Ärendehantering",
        company: "Vectura",
        tags: [],
        plannedStart: "2026-02-06T09:36:00",
        plannedEnd: "2026-02-06T09:51:00",
        created: "2026-02-05T08:05:00",
        closed: "2026-02-06T10:00:00",
        conversations: [
            {
                author: "Patrik Svensson",
                email: "patrik.svensson@vectura.se",
                date: "2026-02-05T08:05:00",
                type: "private_note",
                recipients: "stefan.molin@vectura.se",
                body: "Du behöver se MPs Wrike."
            },
            {
                author: "Jannica Svan",
                email: "jannica.svan@missionpoint.se",
                date: "2026-02-06T09:51:00",
                type: "reply",
                recipients: "patrik.svensson@vectura.se, stefan.molin@vectura.se",
                body: "Hi Patrik Svensson,\n\nDetta är gjort.\nMvh Jannica\n\nTicket: https://vecturafastigheter.freshservice.com/helpdesk/tickets/132"
            },
            {
                author: "Patrik Svensson",
                email: "patrik.svensson@vectura.se",
                date: "2026-02-06T09:56:00",
                type: "public_note",
                recipients: "jannica.svan@missionpoint.se, stefan.molin@vectura.se",
                body: "Förstå! Lade till lösningsbeskrivning med AI - vi provar en AI som heter Freddy för det"
            }
        ],
        activity: [
            { text: "Ärende skapat av Patrik Svensson", time: "2026-02-05T08:05:00" },
            { text: "Tilldelad till Jannica Svan i gruppen MissionPoint", time: "2026-02-05T08:06:00" },
            { text: "Privat anteckning tillagd av Patrik Svensson", time: "2026-02-05T08:05:00" },
            { text: "Svar skickat av Jannica Svan", time: "2026-02-06T09:51:00" },
            { text: "Offentlig anteckning tillagd av Patrik Svensson", time: "2026-02-06T09:56:00" },
            { text: "Status ändrad till Stängd", time: "2026-02-06T10:00:00" }
        ],
        resolution: "Åtkomst till Wrike har givits till Stefan Molin. MPs Wrike-licens har verifierats."
    },
    {
        id: "SR-131",
        subject: "Ny bärbar dator till nyanställd",
        description: "Vi behöver en ny bärbar dator (Dell Latitude 5540) till Anna Eriksson som börjar 2026-02-17. Ska vara konfigurerad med standardprogramvara och VPN.",
        requester: { name: "Maria Johansson", email: "maria.johansson@vectura.se" },
        priority: "Medium",
        status: "Pågår",
        source: "Portal",
        type: "Tjänsteförfrågan",
        urgency: "Medium",
        impact: "Låg",
        group: "Infrastruktur",
        handler: "Erik Johansson",
        department: "HR",
        category: "Hårdvara",
        company: "Vectura",
        tags: ["nyanställd", "laptop"],
        plannedStart: "2026-02-10T08:00:00",
        plannedEnd: "2026-02-14T17:00:00",
        created: "2026-02-04T14:23:00",
        closed: null,
        conversations: [
            {
                author: "Maria Johansson",
                email: "maria.johansson@vectura.se",
                date: "2026-02-04T14:23:00",
                type: "reply",
                recipients: "",
                body: "Hej!\n\nVi har en ny medarbetare som börjar den 17 februari. Hon behöver en bärbar dator med standarduppsättning. Vänligen se till att allt är klart innan hennes första dag.\n\nMvh,\nMaria"
            },
            {
                author: "Erik Johansson",
                email: "erik.johansson@vectura.se",
                date: "2026-02-05T09:15:00",
                type: "reply",
                recipients: "maria.johansson@vectura.se",
                body: "Hej Maria,\n\nJag har beställt en Dell Latitude 5540. Den bör levereras inom 3-5 arbetsdagar. Jag börjar konfigurera den så snart den kommer.\n\nMvh,\nErik"
            }
        ],
        activity: [
            { text: "Ärende skapat av Maria Johansson via portalen", time: "2026-02-04T14:23:00" },
            { text: "Tilldelad till Erik Johansson i gruppen Infrastruktur", time: "2026-02-04T14:30:00" },
            { text: "Status ändrad till Pågår", time: "2026-02-05T09:15:00" },
            { text: "Svar skickat av Erik Johansson", time: "2026-02-05T09:15:00" }
        ],
        resolution: null
    },
    {
        id: "SR-130",
        subject: "VPN fungerar inte från hemmakontoret",
        description: "Jag kan inte ansluta till VPN sedan igår kväll. Får felmeddelandet 'Connection timed out'. Har provat att starta om datorn och routern utan resultat.",
        requester: { name: "Stefan Molin", email: "stefan.molin@vectura.se" },
        priority: "Hög",
        status: "Öppen",
        source: "E-post",
        type: "Incident",
        urgency: "Hög",
        impact: "Medium",
        group: "Support",
        handler: "Anna Lindberg",
        department: "IT",
        category: "Nätverk",
        company: "Vectura",
        tags: ["vpn", "remote"],
        plannedStart: "2026-02-07T08:00:00",
        plannedEnd: "2026-02-07T17:00:00",
        created: "2026-02-07T07:32:00",
        closed: null,
        conversations: [
            {
                author: "Stefan Molin",
                email: "stefan.molin@vectura.se",
                date: "2026-02-07T07:32:00",
                type: "reply",
                recipients: "",
                body: "Hej,\n\nMin VPN-anslutning fungerar inte sedan igår kväll. Jag får felmeddelandet 'Connection timed out' varje gång jag försöker ansluta. Jag har testat att starta om datorn och min hemmarouter, men problemet kvarstår.\n\nKan ni hjälpa mig? Jag behöver komma åt systemet för att kunna arbeta idag.\n\nMvh,\nStefan"
            }
        ],
        activity: [
            { text: "Ärende skapat av Stefan Molin via e-post", time: "2026-02-07T07:32:00" },
            { text: "Automatiskt tilldelad till Anna Lindberg i gruppen Support", time: "2026-02-07T07:33:00" },
            { text: "Prioritet satt till Hög baserat på nyckelord", time: "2026-02-07T07:33:00" }
        ],
        resolution: null
    },
    {
        id: "SR-129",
        subject: "Uppdatera Adobe Creative Cloud-licenser",
        description: "Vi behöver uppgradera 5 stycken Adobe CC-licenser från singel-app till hela paketet för marknadsavdelningen.",
        requester: { name: "Lisa Andersson", email: "lisa.andersson@vectura.se" },
        priority: "Medium",
        status: "Väntar",
        source: "Portal",
        type: "Tjänsteförfrågan",
        urgency: "Låg",
        impact: "Låg",
        group: "Support",
        handler: "Patrik Svensson",
        department: "Försäljning",
        category: "Mjukvara",
        company: "Vectura",
        tags: ["licens", "adobe"],
        plannedStart: "2026-02-10T08:00:00",
        plannedEnd: "2026-02-28T17:00:00",
        created: "2026-02-03T11:45:00",
        closed: null,
        conversations: [
            {
                author: "Lisa Andersson",
                email: "lisa.andersson@vectura.se",
                date: "2026-02-03T11:45:00",
                type: "reply",
                recipients: "",
                body: "Hej!\n\nVi behöver uppgradera 5 stycken Adobe Creative Cloud-licenser från enskilda appar (Photoshop + Illustrator) till det kompletta paketet. Det gäller följande användare:\n- Lisa Andersson\n- Johan Berg\n- Sara Nilsson\n- Emma Lund\n- Oscar Ström\n\nVäntar på godkännande från ekonomiavdelningen.\n\nMvh,\nLisa"
            },
            {
                author: "Patrik Svensson",
                email: "patrik.svensson@vectura.se",
                date: "2026-02-04T08:30:00",
                type: "reply",
                recipients: "lisa.andersson@vectura.se",
                body: "Hej Lisa,\n\nTack för förfrågan. Jag har räknat på kostnaden - det blir ca 2500 kr/mån extra för uppgraderingen. Jag har skickat en förfrågan till ekonomiavdelningen för godkännande.\n\nJag återkommer så snart vi har fått ok.\n\nMvh,\nPatrik"
            },
            {
                author: "Patrik Svensson",
                email: "patrik.svensson@vectura.se",
                date: "2026-02-05T14:00:00",
                type: "private_note",
                recipients: "",
                body: "Väntar på svar från ekonomi. Skickat påminnelse."
            }
        ],
        activity: [
            { text: "Ärende skapat av Lisa Andersson via portalen", time: "2026-02-03T11:45:00" },
            { text: "Tilldelad till Patrik Svensson i gruppen Support", time: "2026-02-03T12:00:00" },
            { text: "Svar skickat av Patrik Svensson", time: "2026-02-04T08:30:00" },
            { text: "Status ändrad till Väntar", time: "2026-02-04T08:31:00" },
            { text: "Privat anteckning tillagd av Patrik Svensson", time: "2026-02-05T14:00:00" }
        ],
        resolution: null
    },
    {
        id: "SR-128",
        subject: "Skrivare på plan 3 skriver ut suddigt",
        description: "HP LaserJet Pro M404n på plan 3 (rum 312) skriver ut suddiga dokument. Toner byttes förra veckan. Problemet kvarstår.",
        requester: { name: "Anders Nilsson", email: "anders.nilsson@vectura.se" },
        priority: "Låg",
        status: "Stängd",
        source: "Telefon",
        type: "Incident",
        urgency: "Låg",
        impact: "Låg",
        group: "Infrastruktur",
        handler: "Erik Johansson",
        department: "IT",
        category: "Hårdvara",
        company: "Vectura",
        tags: ["skrivare"],
        plannedStart: "2026-02-01T08:00:00",
        plannedEnd: "2026-02-02T12:00:00",
        created: "2026-01-31T15:20:00",
        closed: "2026-02-02T10:30:00",
        conversations: [
            {
                author: "Anders Nilsson",
                email: "anders.nilsson@vectura.se",
                date: "2026-01-31T15:20:00",
                type: "reply",
                recipients: "",
                body: "Hej,\n\nSkrivaren på plan 3 i rum 312 skriver ut suddigt. Vi bytte toner förra veckan men det hjälpte inte. Kan ni titta på det?\n\nAnders"
            },
            {
                author: "Erik Johansson",
                email: "erik.johansson@vectura.se",
                date: "2026-02-02T10:15:00",
                type: "reply",
                recipients: "anders.nilsson@vectura.se",
                body: "Hej Anders,\n\nJag har nu tittat på skrivaren. Problemet var trumenheten som behövde bytas, inte tonern. Jag har installerat en ny trumenhet och gjort en kalibrering. Utskrifterna bör nu vara skarpa igen.\n\nTestar gärna om du upplever fortsatta problem.\n\nMvh,\nErik"
            }
        ],
        activity: [
            { text: "Ärende skapat via telefonsamtal med Anders Nilsson", time: "2026-01-31T15:20:00" },
            { text: "Tilldelad till Erik Johansson i gruppen Infrastruktur", time: "2026-01-31T15:25:00" },
            { text: "Status ändrad till Pågår", time: "2026-02-01T08:00:00" },
            { text: "Svar skickat av Erik Johansson", time: "2026-02-02T10:15:00" },
            { text: "Status ändrad till Stängd", time: "2026-02-02T10:30:00" }
        ],
        resolution: "Trumenheten i HP LaserJet Pro M404n (rum 312, plan 3) var defekt och har bytts ut. Kalibrering utförd. Utskriftskvaliteten är nu normal."
    },
    {
        id: "SR-127",
        subject: "Behöver åtkomst till SharePoint-projektsida",
        description: "Behöver läs- och skrivrättigheter till SharePoint-sidan 'Projekt Alpha' för det nya konsultteamet (3 personer).",
        requester: { name: "Karin Holm", email: "karin.holm@vectura.se" },
        priority: "Medium",
        status: "Stängd",
        source: "E-post",
        type: "Tjänsteförfrågan",
        urgency: "Medium",
        impact: "Medium",
        group: "Support",
        handler: "Anna Lindberg",
        department: "IT",
        category: "Åtkomst",
        company: "Vectura",
        tags: ["sharepoint", "behörighet"],
        plannedStart: "2026-01-30T08:00:00",
        plannedEnd: "2026-01-30T12:00:00",
        created: "2026-01-29T16:10:00",
        closed: "2026-01-30T09:45:00",
        conversations: [
            {
                author: "Karin Holm",
                email: "karin.holm@vectura.se",
                date: "2026-01-29T16:10:00",
                type: "reply",
                recipients: "",
                body: "Hej,\n\nKan ni ge läs- och skrivrättigheter till SharePoint-sidan 'Projekt Alpha' för följande personer:\n- consultant1@partner.se\n- consultant2@partner.se\n- consultant3@partner.se\n\nDe börjar måndag och behöver ha tillgång direkt.\n\nTack,\nKarin"
            },
            {
                author: "Anna Lindberg",
                email: "anna.lindberg@vectura.se",
                date: "2026-01-30T09:40:00",
                type: "reply",
                recipients: "karin.holm@vectura.se",
                body: "Hej Karin,\n\nKlart! Alla tre konsulter har nu läs- och skrivrättigheter till 'Projekt Alpha' i SharePoint. De bör kunna logga in med sina befintliga konton.\n\nHör av dig om det uppstår några problem.\n\nMvh,\nAnna"
            }
        ],
        activity: [
            { text: "Ärende skapat av Karin Holm via e-post", time: "2026-01-29T16:10:00" },
            { text: "Tilldelad till Anna Lindberg i gruppen Support", time: "2026-01-29T16:15:00" },
            { text: "Status ändrad till Pågår", time: "2026-01-30T09:00:00" },
            { text: "Svar skickat av Anna Lindberg", time: "2026-01-30T09:40:00" },
            { text: "Status ändrad till Stängd", time: "2026-01-30T09:45:00" }
        ],
        resolution: "Läs- och skrivrättigheter till SharePoint-sidan 'Projekt Alpha' har beviljats för alla tre konsulter."
    },
    {
        id: "SR-126",
        subject: "Outlook kraschar vid start",
        description: "Outlook kraschar direkt vid start med felkod 0x80040154. Ominstallation av Office har testats utan framgång.",
        requester: { name: "Jonas Berg", email: "jonas.berg@vectura.se" },
        priority: "Hög",
        status: "Pågår",
        source: "Chat",
        type: "Incident",
        urgency: "Hög",
        impact: "Hög",
        group: "Support",
        handler: "Patrik Svensson",
        department: "IT",
        category: "Mjukvara",
        company: "Vectura",
        tags: ["outlook", "krasch"],
        plannedStart: "2026-02-07T08:00:00",
        plannedEnd: "2026-02-07T12:00:00",
        created: "2026-02-06T16:45:00",
        closed: null,
        conversations: [
            {
                author: "Jonas Berg",
                email: "jonas.berg@vectura.se",
                date: "2026-02-06T16:45:00",
                type: "reply",
                recipients: "",
                body: "Min Outlook kraschar direkt vid start. Felkod: 0x80040154. Jag har redan försökt att avinstallera och installera om Office men problemet kvarstår. Jag behöver tillgång till min e-post asap!"
            },
            {
                author: "Patrik Svensson",
                email: "patrik.svensson@vectura.se",
                date: "2026-02-07T08:15:00",
                type: "reply",
                recipients: "jonas.berg@vectura.se",
                body: "Hej Jonas,\n\nJag undersöker problemet nu. Kan du under tiden använda Outlook Web (outlook.office365.com) för att komma åt din e-post?\n\nJag misstänker att det kan vara en korrupt Outlook-profil. Jag kommer att ta fjärrsession till din dator inom kort.\n\nMvh,\nPatrik"
            }
        ],
        activity: [
            { text: "Ärende skapat av Jonas Berg via chat", time: "2026-02-06T16:45:00" },
            { text: "Tilldelad till Patrik Svensson i gruppen Support", time: "2026-02-06T16:50:00" },
            { text: "Prioritet höjd till Hög", time: "2026-02-06T16:50:00" },
            { text: "Status ändrad till Pågår", time: "2026-02-07T08:15:00" },
            { text: "Svar skickat av Patrik Svensson", time: "2026-02-07T08:15:00" }
        ],
        resolution: null
    },
    {
        id: "SR-125",
        subject: "Ny nätverksswitch till serverrummet",
        description: "Behöver beställa och installera en ny 48-portars managed switch (Cisco Catalyst 9200) för att utöka kapaciteten i serverrummet.",
        requester: { name: "Erik Johansson", email: "erik.johansson@vectura.se" },
        priority: "Medium",
        status: "Öppen",
        source: "Portal",
        type: "Ändring",
        urgency: "Medium",
        impact: "Medium",
        group: "Infrastruktur",
        handler: "",
        department: "IT",
        category: "Nätverk",
        company: "Vectura",
        tags: ["nätverk", "infrastruktur"],
        plannedStart: "2026-02-17T08:00:00",
        plannedEnd: "2026-03-07T17:00:00",
        created: "2026-02-06T10:00:00",
        closed: null,
        conversations: [
            {
                author: "Erik Johansson",
                email: "erik.johansson@vectura.se",
                date: "2026-02-06T10:00:00",
                type: "reply",
                recipients: "",
                body: "Vi behöver utöka nätverkskapaciteten i serverrummet. Den nuvarande switchen (Cisco 2960) är full. Föreslår att vi skaffar en Cisco Catalyst 9200 48-port PoE+.\n\nKostnadsuppskattning: ca 35 000 kr\nNedtid vid installation: ca 30 min (planerat underhållsfönster)\n\nBehöver godkännande från IT-chef innan beställning."
            }
        ],
        activity: [
            { text: "Ärende skapat av Erik Johansson via portalen", time: "2026-02-06T10:00:00" },
            { text: "Kategoriserat som Ändring", time: "2026-02-06T10:01:00" }
        ],
        resolution: null
    },
    {
        id: "SR-124",
        subject: "Glömt lösenord till SAP",
        description: "Har glömt mitt lösenord till SAP-systemet och kontot har blivit låst efter för många felaktiga försök.",
        requester: { name: "Eva Svensson", email: "eva.svensson@vectura.se" },
        priority: "Medium",
        status: "Stängd",
        source: "Telefon",
        type: "Tjänsteförfrågan",
        urgency: "Medium",
        impact: "Låg",
        group: "Support",
        handler: "Anna Lindberg",
        department: "Ekonomi",
        category: "Åtkomst",
        company: "Vectura",
        tags: ["lösenord", "sap"],
        plannedStart: "2026-02-05T08:00:00",
        plannedEnd: "2026-02-05T09:00:00",
        created: "2026-02-05T08:10:00",
        closed: "2026-02-05T08:35:00",
        conversations: [
            {
                author: "Eva Svensson",
                email: "eva.svensson@vectura.se",
                date: "2026-02-05T08:10:00",
                type: "reply",
                recipients: "",
                body: "Hej, jag har glömt mitt lösenord till SAP och kontot är nu låst. Kan ni hjälpa mig att återställa det? Jag behöver komma in för att köra månadsrapporten."
            },
            {
                author: "Anna Lindberg",
                email: "anna.lindberg@vectura.se",
                date: "2026-02-05T08:30:00",
                type: "reply",
                recipients: "eva.svensson@vectura.se",
                body: "Hej Eva,\n\nJag har låst upp ditt SAP-konto och skickat ett temporärt lösenord till din e-post. Kom ihåg att byta det vid första inloggningen.\n\nMvh,\nAnna"
            }
        ],
        activity: [
            { text: "Ärende skapat via telefonsamtal med Eva Svensson", time: "2026-02-05T08:10:00" },
            { text: "Tilldelad till Anna Lindberg i gruppen Support", time: "2026-02-05T08:12:00" },
            { text: "Status ändrad till Pågår", time: "2026-02-05T08:20:00" },
            { text: "Svar skickat av Anna Lindberg", time: "2026-02-05T08:30:00" },
            { text: "Status ändrad till Stängd", time: "2026-02-05T08:35:00" }
        ],
        resolution: "SAP-konto upplåst och temporärt lösenord skickat till användaren."
    },
    {
        id: "SR-123",
        subject: "Installera dubbla skärmar på nya arbetsplatsen",
        description: "Ny arbetsplats (rum 405) behöver dubbla 27\" skärmar med dockningsstation för Dell Latitude laptop.",
        requester: { name: "Maria Johansson", email: "maria.johansson@vectura.se" },
        priority: "Låg",
        status: "Öppen",
        source: "E-post",
        type: "Tjänsteförfrågan",
        urgency: "Låg",
        impact: "Låg",
        group: "Infrastruktur",
        handler: "Erik Johansson",
        department: "HR",
        category: "Hårdvara",
        company: "Vectura",
        tags: ["skärm", "arbetsplats"],
        plannedStart: "2026-02-17T08:00:00",
        plannedEnd: "2026-02-21T17:00:00",
        created: "2026-02-07T13:20:00",
        closed: null,
        conversations: [
            {
                author: "Maria Johansson",
                email: "maria.johansson@vectura.se",
                date: "2026-02-07T13:20:00",
                type: "reply",
                recipients: "",
                body: "Hej!\n\nVi har iordningställt en ny arbetsplats i rum 405 och behöver:\n- 2 st Dell 27\" UltraSharp-skärmar (U2722D)\n- 1 st Dell WD19S dockningsstation\n- Monteringsarmar för skärmarna\n\nDetta är till den nya medarbetaren som börjar 17 februari.\n\nTack,\nMaria"
            }
        ],
        activity: [
            { text: "Ärende skapat av Maria Johansson via e-post", time: "2026-02-07T13:20:00" },
            { text: "Tilldelad till Erik Johansson i gruppen Infrastruktur", time: "2026-02-07T13:25:00" }
        ],
        resolution: null
    }
];

// Color map for avatars
const AVATAR_COLORS = {
    'P': '#e74c3c',
    'J': '#2ecc71',
    'S': '#3498db',
    'M': '#9b59b6',
    'A': '#e67e22',
    'L': '#1abc9c',
    'K': '#e91e63',
    'E': '#00bcd4'
};
