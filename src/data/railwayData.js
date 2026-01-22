export const RAIL_COLORS = {
    western: "#326AFD",
    central: "#FF2463",
};

export const railwayStations = {
    type: "FeatureCollection",
    features: [
        // CENTRAL LINE
        {
            type: "Feature",
            properties: {
                id: "thane",
                name: "Thane",
                line: "central",
                order: 3,
            },
            geometry: { type: "Point", coordinates: [72.976701, 19.185552] },
        },
        {
            type: "Feature",
            properties: {
                id: "mulund",
                name: "Mulund",
                line: "central",
                order: 3,
            },
            geometry: { type: "Point", coordinates: [72.956365, 19.171408] },
        },
        {
            type: "Feature",
            properties: {
                id: "bhandup",
                name: "Bhandup",
                line: "central",
                order: 3,
            },
            geometry: { type: "Point", coordinates: [72.937759, 19.141911] },
        },
        {
            type: "Feature",
            properties: {
                id: "vikhroli",
                name: "Vikhroli",
                line: "central",
                order: 3,
            },
            geometry: { type: "Point", coordinates: [72.927628, 19.110913] },
        },
        {
            type: "Feature",
            properties: {
                id: "kanjur",
                name: "Kanjur Marg",
                line: "central",
                order: 3,
            },
            geometry: { type: "Point", coordinates: [72.928804, 19.128212] },
        },
        {
            type: "Feature",
            properties: {
                id: "kurla",
                name: "Kurla",
                line: "central",
                order: 3,
            },
            geometry: { type: "Point", coordinates: [72.879549, 19.064474] },
        },
        {
            type: "Feature",
            properties: {
                id: "matunga",
                name: "Matunga",
                line: "central",
                order: 3,
            },
            geometry: { type: "Point", coordinates: [72.850543, 19.027587] },
        },

        // WESTERN LINE
        {
            type: "Feature",
            properties: {
                id: "andheri",
                name: "Andheri",
                line: "western",
                order: 1,
            },
            geometry: { type: "Point", coordinates: [72.8479, 19.1197] },
        },
        {
            type: "Feature",
            properties: {
                id: "goregaon",
                name: "Goregaon",
                line: "western",
                order: 2,
            },
            geometry: { type: "Point", coordinates: [72.8496, 19.1663] },
        },
        {
            type: "Feature",
            properties: {
                id: "malad",
                name: "Malad",
                line: "western",
                order: 3,
            },
            geometry: { type: "Point", coordinates: [72.8486, 19.187] },
        },
        {
            type: "Feature",
            properties: {
                id: "borivali",
                name: "Borivali",
                line: "western",
                order: 3,
            },
            geometry: { type: "Point", coordinates: [72.856434, 19.228734] },
        },
        {
            type: "Feature",
            properties: {
                id: "villeparle",
                name: "Ville Parle",
                line: "western",
                order: 3,
            },
            geometry: { type: "Point", coordinates: [72.843520, 19.100687] },
        },
        {
            type: "Feature",
            properties: {
                id: "bandra",
                name: "Bandra",
                line: "western",
                order: 3,
            },
            geometry: { type: "Point", coordinates: [72.840242, 19.065139] },
        },
        {
            type: "Feature",
            properties: {
                id: "dadar",
                name: "Dadar",
                line: "western",
                order: 3,
            },
            geometry: { type: "Point", coordinates: [72.843574, 19.019123] },
        },
        {
            type: "Feature",
            properties: {
                id: "mumbaicentral",
                name: "Mumbai Central",
                line: "western",
                order: 3,
            },
            geometry: { type: "Point", coordinates: [72.818592, 18.970048] },
        },
    ],
};


export const railwayRoutes = {
    type: "FeatureCollection",
    features: [
        {
            type: "Feature",
            properties: { id: "central", color: "#FF2463" },
            geometry: {
                type: "LineString",
                coordinates: [   
                    [72.976701, 19.185552],    
                    [72.956365, 19.171408],    
                    [72.937759, 19.141911],    
                    [72.928804, 19.128212],    
                    [72.927628, 19.110913],    
                    [72.879549, 19.064474],    
                    [72.850543, 19.027587],    
                    [72.843574, 19.019123],    
                ]
            }
        },
        {
            type: "Feature",
            properties: { id: "western", color: "#326AFD" },
            geometry: {
                type: "LineString",
                coordinates: [
                    [72.856434, 19.228734], 
                    [72.8486, 19.187] ,
                    [72.8496, 19.1663],  
                    [72.8479, 19.1197], 
                    [72.843520, 19.100687], 
                    [72.840242, 19.065139], 
                    [72.847249, 19.028571], 
                    [72.843574, 19.019123], 
                    [72.818592, 18.970048], 
                ]
            }
        }
    ]
};
