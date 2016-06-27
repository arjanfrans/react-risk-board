const config = {
    players: [
        {
            id: '1',
            color: 'red'
        },
        {
            id: '2',
            color: 'green'
        }
    ],
    continents: [
        {
            id: 'africa',
            name: 'Africa',
            bonus: 3,
            "territoryIds": [
                "east_africa",
                "egypt",
                "congo",
                "madagascar",
                "south_africa",
                "north_africa"
            ]
        },
        {
            id: 'asia',
            name: 'Asia',
            bonus: 7,
            "territoryIds": [
                "afghanistan",
                "india",
                "irkutsk",
                "kamchatka",
                "middle_east",
                "mongolia",
                "siam",
                "china",
                "japan",
                "siberia",
                "ural",
                "yakutsk"
            ]
        },
        {
            id: 'europe',
            name: 'Europe',
            bonus: 5,
            "territoryIds": [
                "great_britain",
                "iceland",
                "northern_europe",
                "scandinavia",
                "southern_europe",
                "ukraine",
                "western_europe"
            ]
        },
        {
            id: 'australia',
            name: 'Australia',
            bonus: 2,
            "territoryIds": [
                "eastern_australia",
                "new_guniea",
                "western_australia",
                "indonesia"
            ]
        },
        {
            id: 'south_america',
            name: 'South America',
            bonus: 2,
            "territoryIds": [
                "argentina",
                "brazil",
                "peru",
                "venezuela"
            ]
        },
        {
            id: 'north_america',
            name: 'North America',
            bonus: 5,
            "territoryIds": [
                "alaska",
                "alberta",
                "central_america",
                "eastern_united_states",
                "greenland",
                "northwest_territory",
                "ontario",
                "western_united_states",
                "quebec"
            ]
        }
    ],
    territories: [
        {
            "id": "east_africa",
            "name": "East Africa"
        },
        {
            "id": "egypt",
            "name": "Egypt"
        },
        {
            "id": "congo",
            "name": "Congo"
        },
        {
            "id": "madagascar",
            "name": "Madagascar"
        },
        {
            "id": "south_africa",
            "name": "South Africa"
        },
        {
            "id": "north_africa",
            "name": "North Africa"
        },
        {
            "id": "afghanistan",
            "name": "Afghanistan"
        },
        {
            "id": "india",
            "name": "India"
        },
        {
            "id": "irkutsk",
            "name": "Irkutsk"
        },
        {
            "id": "kamchatka",
            "name": "Kamchatka"
        },
        {
            "id": "middle_east",
            "name": "Middle East"
        },
        {
            "id": "mongolia",
            "name": "Mongolia"
        },
        {
            "id": "siam",
            "name": "Siam"
        },
        {
            "id": "china",
            "name": "China"
        },
        {
            "id": "japan",
            "name": "Japan"
        },
        {
            "id": "siberia",
            "name": "Siberia"
        },
        {
            "id": "ural",
            "name": "Ural"
        },
        {
            "id": "yakutsk",
            "name": "Yakutsk"
        },
        {
            "id": "eastern_australia",
            "name": "Eastern Austrailia"
        },
        {
            "id": "new_guniea",
            "name": "New Guniea"
        },
        {
            "id": "western_australia",
            "name": "Western Austrailia"
        },
        {
            "id": "indonesia",
            "name": "Indonesia"
        },
        {
            "id": "great_britain",
            "name": "Great Britain"
        },
        {
            "id": "iceland",
            "name": "Iceland"
        },
        {
            "id": "northern_europe",
            "name": "Northern Europe"
        },
        {
            "id": "scandinavia",
            "name": "Scandinavia"
        },
        {
            "id": "southern_europe",
            "name": "Southern Europe"
        },
        {
            "id": "ukraine",
            "name": "Ukraine"
        },
        {
            "id": "western_europe",
            "name": "Western Europe"
        },
        {
            "id": "alaska",
            "name": "Alaska"
        },
        {
            "id": "alberta",
            "name": "Alberta"
        },
        {
            "id": "central_america",
            "name": "Central America"
        },
        {
            "id": "eastern_united_states",
            "name": "Eastern United States"
        },
        {
            "id": "greenland",
            "name": "Greenland"
        },
        {
            "id": "northwest_territory",
            "name": "Northwest Territory",
            owner: { id: '2', name: 'Test 2', color: 'red' }
        },
        {
            "id": "ontario",
            "name": "Ontario",
            owner: { id: '1', name: 'Test 1', color: 'green' }
        },
        {
            "id": "western_united_states",
            "name": "Western United States"
        },
        {
            "id": "quebec",
            "name": "Quebec"
        },
        {
            "id": "argentina",
            "name": "Argentina",
            owner: { id: '2', name: 'Test 2', color: 'red' }
        },
        {
            "id": "brazil",
            "name": "Brazil",
            owner: { id: '1', name: 'Test 1', color: 'green' }
        },
        {
            "id": "peru",
            "name": "Peru"
        },
        {
            "id": "venezuela",
            "name": "Venezuela"
        }
    ]
};

export default config;
