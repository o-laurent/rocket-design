import pandas as pd
import rocket

rocket_list = []
def importDB(rocket_list):
    rocket_df = pd.read_csv('rocket_database.csv')
    index = list(rocket_df.index)
    for ind in index:
        rocket_list.append(rocket.Rocket(rocket_df.loc[ind,:]))