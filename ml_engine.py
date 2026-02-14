import pandas as pd
import numpy as np
from prophet import Prophet

# Load once globally
df = pd.read_csv("dataset.csv")
df = df[["country", "year", "co2_per_capita"]]
df = df.dropna()
df = df.sort_values(["country", "year"])


def forecast_country(country_name, periods=10):

    country_df = df[df["country"] == country_name]

    if len(country_df) < 20:
        return None

    prophet_df = country_df[["year", "co2_per_capita"]]
    prophet_df.columns = ["ds", "y"]
    prophet_df["ds"] = pd.to_datetime(prophet_df["ds"], format="%Y")

    model = Prophet()
    model.fit(prophet_df)

    future = model.make_future_dataframe(periods=periods, freq="Y")
    forecast = model.predict(future)

    return forecast

import numpy as np

def forecast_personal_footprint(current_value, years=10, growth_rate=2.0):
    """
    Simulate future personal carbon footprint.
    growth_rate = assumed annual % increase (energy demand, inflation, etc.)
    """

    forecast = []
    value = current_value

    for _ in range(years):
        value = value * (1 + growth_rate / 100)
        forecast.append(round(value, 2))

    return forecast

def apply_reduction(forecast_values, reduction_percent):
    return [
        round(v * (1 - reduction_percent / 100), 2)
        for v in forecast_values
    ]

# def calculate_personal_emission(distance, electricity, meals, waste, renewable_percent):
    
#     # Emission factors (can later move to RAG)
#     transport_factor = 0.14
#     electricity_factor = 0.82
#     meal_factor = 1.25
#     waste_factor = 0.1
    
#     transport = transport_factor * distance * 365
#     electricity = electricity_factor * electricity * 12
#     diet = meal_factor * meals * 365
#     waste = waste_factor * waste * 52
    
#     total = (transport + electricity + diet + waste) / 1000
    
#     # Renewable adjustment
#     total = total * (1 - renewable_percent/100)
    
#     return round(total, 2)

def calculate_personal_emission(distance, electricity, meals, waste, renewable):

    transport_factor = 0.14
    electricity_factor = 0.82
    meal_factor = 1.25
    waste_factor = 0.1

    transport = transport_factor * distance * 365 / 1000
    electricity_emission = electricity_factor * electricity * 12 / 1000
    diet = meal_factor * meals * 365 / 1000
    waste_emission = waste_factor * waste * 52 / 1000

    total = transport + electricity_emission + diet + waste_emission

    total = total * (1 - renewable / 100)

    breakdown = {
        "Transport": round(transport, 2),
        "Electricity": round(electricity_emission, 2),
        "Diet": round(diet, 2),
        "Waste": round(waste_emission, 2)
    }

    return round(total, 2), breakdown



def risk_analysis(country_name):

    country_df = df[df["country"] == country_name]

    ts = country_df["co2_per_capita"].values

    recent_growth = ((ts[-1] - ts[-5]) / ts[-5]) * 100
    volatility = np.std(ts[-10:])

    if recent_growth > 10:
        risk = "High"
    elif recent_growth > 3:
        risk = "Medium"
    else:
        risk = "Low"

    return round(recent_growth, 2), round(volatility, 2), risk

def personal_risk_analysis(personal_emission, country_name):
    
    country_df = df[df["country"] == country_name]
    country_avg = country_df["co2_per_capita"].values[-1]

    if personal_emission > country_avg * 1.5:
        risk = "High"
    elif personal_emission > country_avg:
        risk = "Medium"
    else:
        risk = "Low"

    return round(country_avg, 2), risk
