import React from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import DomainInfo from '../DomainInfo/DomainInfo';
import { PolarArea } from 'react-chartjs-2';
import "./Chart.css";
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);


export default function Chart({ city }) {

    city = JSON.parse(JSON.stringify(city));

    const colours = [
        ["FF1700", "EF4F3F", "C23C2F", "92251A", "A00F00", "CC1503", "E01804"], // red
        ["005EFD", "2D77F5", "5991F1", "4172C5", "1E4D9C", "04307A", "002769"], // blue
        ["FCCB00", "F3CD30", "E9D16D", "BDA74E", "8F791F", "8A6F00", "B89504"], // yellow
        ["85FF00", "A0F642", "9DD65F", "76A345", "568B1B", "3E6315", "539E00"]  // green
    ]

    var subDomainsLabels = []
    var subDomainsData = []
    var backgroundColor = []

    // Ecology
    var i = 0;
    for (const [key, value] of Object.entries(city.Ecology)) {
        if (key !== "score") {
            subDomainsLabels.push(key);
            subDomainsData.push(value.score);
            backgroundColor.push("#" + colours[0][i++]);
        }
    }

    // Economics
    i = 0;
    for (const [key, value] of Object.entries(city.Economics)) {
        if (key !== "score") {
            subDomainsLabels.push(key);
            subDomainsData.push(value.score);
            backgroundColor.push("#" + colours[1][i++]);
        }
    }

    // Politics
    i = 0;
    for (const [key, value] of Object.entries(city.Politics)) {
        if (key !== "score") {
            subDomainsLabels.push(key);
            subDomainsData.push(value.score);
            backgroundColor.push("#" + colours[2][i++]);
        }
    }

    // Culture
    i = 0;
    for (const [key, value] of Object.entries(city.Culture)) {
        if (key !== "score") {
            subDomainsLabels.push(key);
            subDomainsData.push(value.score);
            backgroundColor.push("#" + colours[3][i++]);
        }
    }


    // ['Red: Ecology', 'Blue: Economics', 'Yellow: Politics', 'Green: Culture'],
    const data = {
        labels: subDomainsLabels,
        datasets: [
            {
                label: '# of Votes',
                data: subDomainsData,
                backgroundColor: backgroundColor,
                borderWidth: 1,
            },
        ],
        options: {
            plugins: {
                legend: { hidden: true }
            }

        }
    };


    city.Ecology.name = "Ecology";
    city.Economics.name = "Economics";
    city.Politics.name = "Politics";
    city.Culture.name = "Culture";


    return (<>
        <div className="chart">
            <PolarArea data={data} />
            <div className="breakdown">
                <DomainInfo info={city.Ecology} obj={city} />
                <DomainInfo info={city.Economics} obj={city} />
                <DomainInfo info={city.Politics} obj={city} />
                <DomainInfo info={city.Culture} obj={city} />
            </div>
        </div>
    </>)
}



