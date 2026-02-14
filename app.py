from flask import Flask, render_template, request
import json

app = Flask(__name__)

# Carbon pricing by country (USD per tonne CO2)
CARBON_PRICING = {
    'default': 50,  # Global average carbon price
    'canada': 65,
    'united kingdom': 85,
    'germany': 90,
    'france': 95,
    'sweden': 130,
    'switzerland': 120,
    'norway': 80,
    'united states': 45,
    'china': 15,
    'india': 10,
    'australia': 55,
    'japan': 40,
    'south korea': 25,
    'brazil': 12,
    'mexico': 18,
    'south africa': 20
}

# Country average emissions (tonnes CO2 per capita)
COUNTRY_AVERAGES = {
    'default': 4.5,
    'united states': 14.2,
    'canada': 15.4,
    'australia': 15.0,
    'saudi arabia': 16.9,
    'russia': 11.8,
    'japan': 8.6,
    'germany': 7.9,
    'china': 7.6,
    'united kingdom': 5.2,
    'france': 4.6,
    'india': 1.9,
    'brazil': 2.0,
    'mexico': 3.0,
    'south africa': 7.4,
    'indonesia': 2.3,
    'argentina': 3.9,
    'turkey': 5.1,
    'pakistan': 0.9,
    'bangladesh': 0.6,
    'nigeria': 0.6,
    'egypt': 2.5,
    'vietnam': 3.5,
    'philippines': 1.2,
    'thailand': 3.8,
    'malaysia': 8.0,
    'singapore': 8.9,
    'south korea': 11.8,
    'italy': 5.4,
    'spain': 5.0,
    'netherlands': 8.1,
    'sweden': 3.4,
    'norway': 7.6,
    'switzerland': 4.1,
    'austria': 6.9,
    'belgium': 8.0,
    'denmark': 5.0,
    'finland': 7.9,
    'ireland': 7.7,
    'new zealand': 6.8,
    'israel': 6.2,
    'chile': 4.4,
    'peru': 1.7,
    'colombia': 1.8,
    'morocco': 1.7,
    'kenya': 0.4,
    'ethiopia': 0.1,
    'ghana': 0.5,
    'tanzania': 0.2,
    'uganda': 0.1,
    'zambia': 0.3,
    'zimbabwe': 0.7,
    'botswana': 2.6,
    'namibia': 1.5,
    'myanmar': 0.6,
    'sri lanka': 0.8,
    'nepal': 0.3,
    'cambodia': 0.9,
    'laos': 2.6,
    'mongolia': 11.1,
    'uzbekistan': 3.2,
    'kazakhstan': 13.0,
    'ukraine': 5.0,
    'poland': 7.8,
    'czech republic': 9.0,
    'romania': 3.7,
    'hungary': 4.4,
    'portugal': 4.0,
    'greece': 5.7,
    'croatia': 4.2,
    'serbia': 6.0,
    'bulgaria': 6.8,
    'slovakia': 6.0,
    'slovenia': 6.0,
    'lithuania': 3.5,
    'latvia': 3.3,
    'estonia': 7.8,
    'cyprus': 5.6,
    'luxembourg': 15.3,
    'malta': 3.0,
    'iceland': 9.9,
    'liechtenstein': 3.8,
    'monaco': 2.5,
    'andorra': 6.0,
    'san marino': 5.5,
    'vatican city': 0.5
}

def calculate_emissions(data):
    """Calculate carbon emissions based on user inputs"""
    # Extract inputs
    country = data.get('country', '').lower().strip()
    distance = float(data.get('distance', 0))
    electricity = float(data.get('electricity', 0))
    meals = float(data.get('meals', 3))
    waste = float(data.get('waste', 0))
    renewable = float(data.get('renewable', 0))
    reduction = float(data.get('reduction', 10))
    
    # Get country average
    country_avg = COUNTRY_AVERAGES.get(country, COUNTRY_AVERAGES['default'])
    
    # Calculate individual components (tonnes CO2 per year)
    # Transport: 0.12 kg CO2 per km (car average) * 365 days
    transport_emissions = (distance * 0.12 * 365) / 1000
    
    # Electricity: 0.4 kg CO2 per kWh (global average) * 12 months
    # Adjust for renewable energy usage
    electricity_factor = 0.4 * (1 - renewable / 100)
    electricity_emissions = (electricity * electricity_factor * 12) / 1000
    
    # Food: 2.5 kg CO2 per meal (average diet) * 365 days
    food_emissions = (meals * 2.5 * 365) / 1000
    
    # Waste: 0.5 kg CO2 per kg waste * 52 weeks
    waste_emissions = (waste * 0.5 * 52) / 1000
    
    # Total personal emissions
    personal_current = transport_emissions + electricity_emissions + food_emissions + waste_emissions
    
    # Determine risk level
    if personal_current > country_avg * 1.3:
        risk = "High"
    elif personal_current > country_avg * 0.9:
        risk = "Medium"
    else:
        risk = "Low"
    
    # Generate 10-year forecast
    years = list(range(2025, 2035))
    original = [personal_current * (1.02 ** i) for i in range(10)]  # 2% annual growth
    adjusted = [personal_current * (1 - reduction/100) * (0.98 ** i) for i in range(10)]  # With reduction
    
    # Emission breakdown
    breakdown = {
        'Transport': round(transport_emissions, 2),
        'Electricity': round(electricity_emissions, 2),
        'Food': round(food_emissions, 2),
        'Waste': round(waste_emissions, 2)
    }
    
    # Calculate cost analysis
    cost_analysis = calculate_cost_analysis(
        country, personal_current, transport_emissions, 
        electricity_emissions, food_emissions, waste_emissions,
        reduction, renewable
    )
    
    # Generate recommendations
    recommendations = generate_recommendations(
        transport_emissions, electricity_emissions, food_emissions, 
        waste_emissions, renewable, reduction
    )
    
    return {
        'personal_current': round(personal_current, 2),
        'country_avg': country_avg,
        'risk': risk,
        'years': years,
        'original': [round(x, 2) for x in original],
        'adjusted': [round(x, 2) for x in adjusted],
        'breakdown': breakdown,
        'reduction_scenario': reduction,
        'cost_analysis': cost_analysis,
        'recommendations': recommendations
    }

def calculate_cost_analysis(country, total_emissions, transport, electricity, food, waste, reduction_target, renewable_pct):
    """Calculate cost implications of carbon emissions and potential savings"""
    # Get carbon price for country
    carbon_price = CARBON_PRICING.get(country, CARBON_PRICING['default'])
    
    # Calculate current annual carbon costs
    transport_cost = round(transport * carbon_price)
    electricity_cost = round(electricity * carbon_price)
    food_cost = round(food * carbon_price * 0.3)  # Food has lower carbon pricing
    waste_cost = round(waste * carbon_price * 0.5)  # Waste has medium carbon pricing
    
    current_annual_cost = transport_cost + electricity_cost + food_cost + waste_cost
    
    # Calculate potential savings from various interventions
    solar_savings = round(electricity_cost * 0.6)  # Solar reduces electricity cost by 60%
    transport_savings = round(transport_cost * 0.35)  # EV/public transit saves 35%
    efficiency_savings = round(electricity_cost * 0.25)  # Home efficiency saves 25%
    
    potential_savings = solar_savings + transport_savings + efficiency_savings
    
    # 10-year projection
    ten_year_savings = potential_savings * 10
    ten_year_reduction = (potential_savings / carbon_price) * 10  # Convert cost back to tonnes
    
    # ROI scenarios for chart
    scenarios = {
        'costs': [
            current_annual_cost,
            current_annual_cost - solar_savings,
            current_annual_cost - transport_savings,
            current_annual_cost - efficiency_savings,
            current_annual_cost - potential_savings
        ],
        'carbon_costs': [
            current_annual_cost,
            round((total_emissions - electricity * 0.6) * carbon_price),
            round((total_emissions - transport * 0.35) * carbon_price),
            round((total_emissions - electricity * 0.25) * carbon_price),
            round((total_emissions - (electricity * 0.6 + transport * 0.35 + electricity * 0.25)) * carbon_price)
        ],
        'savings': [0, solar_savings, transport_savings, efficiency_savings, potential_savings]
    }
    
    return {
        'current_annual_cost': current_annual_cost,
        'transport_cost': transport_cost,
        'electricity_cost': electricity_cost,
        'food_cost': food_cost,
        'waste_cost': waste_cost,
        'potential_savings': potential_savings,
        'solar_savings': solar_savings,
        'transport_savings': transport_savings,
        'efficiency_savings': efficiency_savings,
        'ten_year_savings': ten_year_savings,
        'ten_year_reduction': round(ten_year_reduction, 1),
        'roi_scenarios': scenarios,
        'carbon_price': carbon_price
    }

def generate_recommendations(transport, electricity, food, waste, renewable_pct, reduction_target):
    """Generate personalized recommendations based on emission profile"""
    recommendations = []
    
    # Sort emissions by impact
    emissions = {
        'transport': transport,
        'electricity': electricity,
        'food': food,
        'waste': waste
    }
    sorted_emissions = sorted(emissions.items(), key=lambda x: x[1], reverse=True)
    
    # Top emitter recommendation
    top_emitter = sorted_emissions[0][0]
    
    if top_emitter == 'transport' and transport > 1.0:
        recommendations.append({
            'icon': 'fa-bicycle',
            'title': 'Switch to Electric Vehicle or Public Transit',
            'description': 'Replace your gasoline vehicle with an EV or use public transit for your daily commute. This can eliminate tailpipe emissions and reduce fuel costs significantly.',
            'annual_savings': 420,
            'carbon_reduction': round(transport * 0.35, 1),
            'investment': 35000,
            'payback_period': '7 years (with incentives)',
            'roi': 14
        })
    
    if top_emitter == 'electricity' and electricity > 1.5:
        recommendations.append({
            'icon': 'fa-solar-panel',
            'title': 'Install Rooftop Solar Panels',
            'description': 'Generate your own clean electricity with a 5kW solar system. Excess power can be sold back to the grid in many regions.',
            'annual_savings': 580,
            'carbon_reduction': round(electricity * 0.6, 1),
            'investment': 12000,
            'payback_period': '5-7 years',
            'roi': 18
        })
        
        recommendations.append({
            'icon': 'fa-home',
            'title': 'Home Energy Efficiency Upgrade',
            'description': 'Install smart thermostats, LED lighting, and improve insulation. Low-cost changes with immediate impact.',
            'annual_savings': 240,
            'carbon_reduction': round(electricity * 0.25, 1),
            'investment': 2500,
            'payback_period': '10 months',
            'roi': 96
        })
    
    if food > 2.0:
        recommendations.append({
            'icon': 'fa-carrot',
            'title': 'Adopt Plant-Based Diet 3 Days/Week',
            'description': 'Reducing meat consumption, especially beef, significantly lowers your food-related carbon footprint while improving health.',
            'annual_savings': 180,
            'carbon_reduction': round(food * 0.2, 1),
            'investment': 0,
            'payback_period': 'Immediate',
            'roi': 0
        })
    
    if waste > 0.5:
        recommendations.append({
            'icon': 'fa-recycle',
            'title': 'Zero Waste Lifestyle Program',
            'description': 'Implement composting, recycling, and buy-in-bulk strategies to minimize landfill waste and associated methane emissions.',
            'annual_savings': 120,
            'carbon_reduction': round(waste * 0.4, 1),
            'investment': 150,
            'payback_period': '15 months',
            'roi': 80
        })
    
    if renewable_pct < 20:
        recommendations.append({
            'icon': 'fa-wind',
            'title': 'Switch to Green Energy Provider',
            'description': 'Choose a utility company that offers 100% renewable energy plans. Often costs the same or less than fossil fuel power.',
            'annual_savings': 200,
            'carbon_reduction': round(electricity * 0.5, 1),
            'investment': 0,
            'payback_period': 'Immediate',
            'roi': 0
        })
    
    # Always add remote work if transport is significant
    if transport > 0.8:
        recommendations.append({
            'icon': 'fa-laptop-house',
            'title': 'Negotiate Remote Work 2 Days/Week',
            'description': 'Working from home just 2 days per week reduces commuting emissions by 40% with no upfront investment.',
            'annual_savings': 340,
            'carbon_reduction': round(transport * 0.4, 1),
            'investment': 200,
            'payback_period': '3 weeks',
            'roi': 1700
        })
    
    # Sort by ROI (highest first), putting 0 ROI (no investment) at end
    recommendations.sort(key=lambda x: (x['roi'] == 0, -x['roi']))
    
    return recommendations[:5]  # Return top 5 recommendations

@app.route('/', methods=['GET', 'POST'])
def index():
    result = None
    if request.method == 'POST':
        result = calculate_emissions(request.form)
    return render_template('index.html', result=result)

if __name__ == '__main__':
    app.run(debug=True)