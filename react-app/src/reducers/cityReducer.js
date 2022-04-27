import * as types from '../actions/types';

const initialState = {
    cities: [],
    totalCount: 0,
    showSidebar: false,
    citySelected: {
        "insurance": 22.7,
        "past_trade_dollars_2020": 2556480.48,
        "county": "Alameda",
        "frequent_physical_distress_in_2018_percent": 9.3,
        "air_pollution_2018": 11.2,
        "alltransit_performance_score": 8.8,
        "preventive_services_2018": 34.7,
        "speak_a_language_other_than_english": 21.7,
        "score": "62.40",
        "percentage_of_residents_living_in_poverty_in_2019": 18.7,
        "foreign_born": 20.7,
        "state_annual_total_nonrenewables_net_generation_m_wh_2020": 110674673.0,
        "state": "California",
        "state_id": "CA",
        "government_finances_revenue_per_resident_in_2018": 3619.17,
        "two_or_more_races": 7.4,
        "longitude": -122.276,
        "population": 121363.0,
        "government_finances_cash_and_securities_per_resident_in_2018": 3127.82,
        "name": "Berkeley",
        "future_trade_tons_2030": 1486806.432,
        "population_percent": 16.7,
        "crimes_occurred": 12.4,
        "walkability_2019": 83.3,
        "city_id": 1840018914.0,
        "past_trade_tons_2020": 1299362.567,
        "employees_imputed_2017": 22.33,
        "registered_voters": 69.49,
        "latitude": 37.8723,
        "park_access": 70.3,
        "park_access_2018": 94.3,
        "zips": 9.47089470794706e+54,
        "walkability": 43.1,
        "county_fips": 6001.0,
        "air_quality_2020": 10.5,
        "broadband_connection_2019": 83.6,
        "government_finances_debt_per_resident_in_2018": 5175.47,
        "bachelors_degree_or_higher": 76.5,
        "unemployment_in_november_2020": 5.3,
        "violent_crimes": 1050.4,
        "median_gross_rent_in_2019": 1837.0,
        "religious_diversity": 34.0,
        "cost_of_living_index_in_march_2019": 162.6,
        "government_finances_expenditure_per_resident_in_2018": 3413.35,
        "density": 4473.0,
        "revenue_imputed_2017": 19.44,
        "vacant_houses": 0.116085693,
        "state_annual_total_renewables_net_generation_m_wh_2020": 82279482.0,
        "future_trade_dollars_2030": 3334321.85,
        "close_access_to_healthy_foods": 39.0,
        "average_domestic_production_to_consumption_ratio_2020": 0.946299147,
        "payroll_imputed_2017": 19.67,
        "state_annual_co_2_equivalent_total_output_emission_rate_lb_m_wh_2020": 453.118,
        "Ecology": {
            "WaterAndAir": {
                "breakdown": {
                    "air_quality_2020": 89.80582524271846,
                    "air_pollution_2018": 59.748427672955984
                },
                "score": 74.78
            },
            "HabitatAndSettlements": {
                "breakdown": {
                    "park_access_2018": 94.48897795591182
                },
                "score": 94.49
            },
            "BuiltFormAndTransport": {
                "breakdown": {
                    "alltransit_performance_score": 91.66666666666667
                },
                "score": 91.67
            },
            "EmbodimentAndSustenance": {
                "breakdown": {
                    "frequent_physical_distress_in_2018_percent": 55.714285714285715
                },
                "score": 55.71
            },
            "score": 79.16
        },
        "Economics": {
            "ProductionAndResourcing": {
                "breakdown": {
                    "cost_of_living_index_in_march_2019": 81.50375939849623
                },
                "score": 81.5
            },
            "ExchangeAndTransfer": {
                "breakdown": {
                    "past_trade_dollars_2020": 83.92658710690247,
                    "past_trade_tons_2020": 47.22973676812873,
                    "future_trade_dollars_2030": 90.4001221321695,
                    "future_trade_tons_2030": 49.80265308438116
                },
                "score": 67.84
            },
            "AccountingAndRegulation": {
                "breakdown": {
                    "government_finances_expenditure_per_resident_in_2018": 14.403919084691678,
                    "government_finances_revenue_per_resident_in_2018": 18.255190429665333,
                    "government_finances_debt_per_resident_in_2018": 90.32113470866064,
                    "government_finances_cash_and_securities_per_resident_in_2018": 12.365793960891322
                },
                "score": 33.84
            },
            "ConsumptionAndUse": {
                "breakdown": {
                    "average_domestic_production_to_consumption_ratio_2020": 30.341151209902538
                },
                "score": 30.34
            },
            "LabourAndWelfare": {
                "breakdown": {
                    "revenue_imputed_2017": 82.86445012787725,
                    "payroll_imputed_2017": 83.1009716941276,
                    "employees_imputed_2017": 80.43948126801152
                },
                "score": 82.13
            },
            "TechnologyAndInfrastructure": {
                "breakdown": {
                    "broadband_connection_2019": 91.06753812636165,
                    "preventive_services_2018": 79.40503432494279,
                    "park_access_2018": 94.48897795591182,
                    "walkability_2019": 88.2415254237288
                },
                "score": 88.3
            },
            "WealthAndDistribution": {
                "breakdown": {
                    "unemployment_in_november_2020": 86.60287081339713,
                    "percentage_of_residents_living_in_poverty_in_2019": 55.69948186528498,
                    "median_gross_rent_in_2019": 66.55797101449275
                },
                "score": 69.62
            },
            "score": 64.8
        },
        "Culture": {
            "IdentityAndEngagement": {
                "breakdown": {
                    "two_or_more_races": 42.285714285714285
                },
                "score": 42.29
            },
            "GenderAndGenerations": {
                "breakdown": {
                    "speak_a_language_other_than_english": 23.38362068965517
                },
                "score": 23.38
            },
            "CreativityAndRecreation": {
                "breakdown": {
                    "park_access": 70.37037037037037
                },
                "score": 70.37
            },
            "MemoryAndProjection": {
                "breakdown": {
                    "foreign_born": 27.3447820343461
                },
                "score": 27.34
            },
            "BeliefsAndIdeas": {
                "breakdown": {
                    "religious_diversity": 45.33333333333333
                },
                "score": 45.33
            },
            "EnquiryAndLearning": {
                "breakdown": {
                    "bachelors_degree_or_higher": 94.32799013563502
                },
                "score": 94.33
            },
            "WellbeingAndHealth": {
                "breakdown": {
                    "walkability": 45.65677966101695,
                    "close_access_to_healthy_foods": 58.2089552238806
                },
                "score": 54.02
            },
            "score": 51.01
        },
        "Politics": {
            "OrganizationAndGovernance": {
                "breakdown": {
                    "vacant_houses": 32.728478978414955
                },
                "score": 32.73
            },
            "LawAndJustice": {
                "breakdown": {
                    "population_percent": 44.06332453825858
                },
                "score": 44.06
            },
            "CommunicationAndCritique": {
                "breakdown": {
                    "crimes_occurred": 59.61538461538461
                },
                "score": 59.62
            },
            "RepresentationAndNegotiation": {
                "breakdown": {
                    "registered_voters": 82.3341232227488
                },
                "score": 82.33
            },
            "SecurityAndAccord": {
                "breakdown": {
                    "violent_crimes": 54.360089013093216
                },
                "score": 54.36
            },
            "score": 54.62
        }
    },
    loading: true
};

const cityReducers = (state = initialState, action) => {

    // const { current: map } = useMap();

    switch (action.type) {
        case types.GOT_CITIES:
            return {
                ...state,
                cities: action.payload.cities,
                totalCount: action.payload.total_count,
                loading: false
            };
        case types.GOT_CITY_DETAILS:
            // map.flyTo({ center: [action.payload.longitude, action.payload.latitude], zoom: 8.5, offset: [-250, -50] });
            return {
                ...state,
                showSidebar: true,
                citySelected: { ...action.payload },
                loading: false
            }
        case types.CLOSE_SIDEBAR:
            return {
                ...state,
                showSidebar: false
            }
        case types.OPEN_SIDEBAR:
            return {
                ...state,
                showSidebar: true
            }
        default: return state;
    }

};

export default cityReducers;