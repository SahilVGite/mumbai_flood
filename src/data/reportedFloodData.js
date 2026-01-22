import {
    FloodImage1,
    FloodImage2,
    FloodImage3,
    FloodImage4,
    FloodImage5,
    FloodImage6,
} from "../assets/images"

export const reportedFloodData = [
    {
        user: "User 01",
        date: "02 Jun 2025",
        time: "10:15 am",
        location: {
            area: "Galleria, Hiranandani, Powai, Mumbai, Maharashtra. 400076",
            coordinates: [72.906196, 19.117095],
        },
        message: "The road towards Dmart is blocked due to water logging. Auto rickshaws are stuck in water. Its raining continuously for the past 1.5 hrs.",
        votes: {
            upvote: 6,
            downvote: 0,
        },
        images: [FloodImage1, FloodImage2, FloodImage3],
    },
    {
        user: "User 02",
        date: "05 Jun 2025",
        time: "8:35 am",
        location: {
            area: "SV Patel Nagar, Andheri West, Mumbai, Maharashtra 400053",
            coordinates: [72.820375, 19.139657],
        },
        message: "The road towards Dmart is blocked due to water logging. Auto rickshaws are stuck in water. Its raining continuously for the past 1.5 hrs.",
        votes: {
            upvote: 9,
            downvote: 0,
        },
        images: [FloodImage4, FloodImage5, FloodImage6],
    },
    {
        user: "User 03",
        date: "10 Jun 2025",
        time: "12:07 pm",
        location: {
            area: "A-201, Vasudev Building, Mamlatdarwadi Road No 2,, Mahavir Hospital Wala Gully , Malad (west), Mumbai, Maharashtra",
            coordinates: [72.845160, 19.186915],
        },
        message: "The road towards Dmart is blocked due to water logging. Auto rickshaws are stuck in water. Its raining continuously for the past 1.5 hrs.",
        votes: {
            upvote: 5,
            downvote: 1,
        },
        images: [FloodImage5, FloodImage3],
    },
    {
        user: "User 04",
        date: "15 Jun 2025",
        time: "04:17 pm",
        location: {
            area: "Bandra West, Mumbai, Maharashtra 400050",
            coordinates: [72.824512, 19.059176],
        },
        message: "The road towards Dmart is blocked due to water logging. Auto rickshaws are stuck in water. Its raining continuously for the past 1.5 hrs.",
        votes: {
            upvote: 2,
            downvote: 3,
        },
        images: [FloodImage6, FloodImage4, FloodImage5],
    },
    {
        user: "User 05",
        date: "13 Jun 2025",
        time: "02:12 pm",
        location: {
            area: "3RGC+3W9, Danda Village, Khar Danda, Mumbai, Maharashtra 400052",
            coordinates: [72.822278, 19.075198],
        },
        message: "The road towards Dmart is blocked due to water logging. Auto rickshaws are stuck in water. Its raining continuously for the past 1.5 hrs.",
        votes: {
            upvote: 7,
            downvote: 0,
        },
        images: [FloodImage3, FloodImage1],
    },
    {
        user: "User 06",
        date: "15 Jun 2025",
        time: "03:03 pm",
        location: {
            area: "No.3, M-6/105, Daulat Nagar, Santacruz (West), Mumbai, Maharashtra 400054",
            coordinates: [72.832066, 19.088511],
        },
        message: "The road towards Dmart is blocked due to water logging. Auto rickshaws are stuck in water. Its raining continuously for the past 1.5 hrs.",
        votes: {
            upvote: 5,
            downvote: 1,
        },
        images: [FloodImage3, FloodImage4, FloodImage5],
    },
];

export const twittedData = [
    {
        user: "Tweet 01",
        date: "02 Jun 2025",
        time: "10:15 am",
        twitter: "@AmitSharma92",
        message: "Waterlogging already ankle deep outside Andheri station. Trains moving super slow. Please avoid if possible.",
        tags: ["#MumbaiRains", "#Andheri", "#LocalTrainDelay",],
        coordinates: [72.824840, 19.136368],
    },
    {
        user: "Tweet 02",
        date: "02 Jun 2025",
        time: "11:25 am",
        twitter: "@mumbairainjournal ",
        message: "Continuous downpour for 2 hours. High tide expected in Colaba at 5:30pm. Stay indoors.",
        tags: ["#MumbaiWeather", "#HighTide",],
        coordinates: [72.833388, 19.185618],
    },
    {
        user: "Tweet 02",
        date: "02 Jun 2025",
        time: "11:25 am",
        twitter: "@mumbairainjournal ",
        message: "Continuous downpour for 2 hours. High tide expected in Colaba at 5:30pm. Stay indoors.",
        tags: ["#MumbaiWeather", "#HighTide",],
        coordinates: [72.825563, 19.076684],
    },
];
