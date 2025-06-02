#Import Required Modules
import requests, pandas, math, geopandas, shapely, json

# Open and read the JSON file
with open('Birds.json', 'r', encoding='utf-8') as file:
    data =  json.load(file)
#Load each Taxon Number Into a List
taxons = []
for i in range(0, len(data["NativeBirds"])):
    taxons.append(data["NativeBirds"][i]["TaxonNum"])

print(taxons)

for n, taxon in enumerate(taxons):
    #Get User Input for Species Selection by iNaturalist Taxon Number
    userInput = taxon
    print(f"Running New Taxon {userInput}")

    grading = "&quality_grade=research"
    captive = "captive=false"
    print("API Parameters Set: Research Grade = " + grading + " Captive Exclusion = " + captive)        
    
    #Determine number of pages of observations needed to be pulled
    print("API URL for determining number of pages: https://api.inaturalist.org/v1/observations?" + captive + grading + "&indentified=true&taxon_id=" + str(userInput) + "&geo=true&per_page=200") 
    obsResults = requests.get("https://api.inaturalist.org/v1/observations?" + captive + grading + "&indentified=true&taxon_id=" + str(userInput) + "&geo=true&per_page=200").json()["total_results"] 
    obsNumber = math.ceil(obsResults / 200)
    print("Number of pages of observations found: " + str(obsNumber))
    
    #Create Empty Dataframe with X, Y Columns
    obsdf = pandas.DataFrame(columns=['x', 'y'])
    
    lastid = 999999999
    
    #For each page of results, get observation location results and concat to empty dataframe to create one dataframe with all location results. 
    for i in range(1, obsNumber+1):
        results = requests.get("https://api.inaturalist.org/v1/observations?" + captive + grading + "&id_below=" + str(lastid) + "&indentified=true&taxon_id=" + str(userInput) + "&geo=true&per_page=200").json()['results']
        print("API URL for getting observations: https://api.inaturalist.org/v1/observations?" + captive + grading + "&id_below=" + str(lastid) + "&indentified=true&taxon_id=" + str(userInput) + "&geo=true&per_page=200")
        
        #Normalised Out Desired Variables from each Observation
        normalisedloc = pandas.json_normalize(results)['location']
        normalisedtime = pandas.json_normalize(results)['observed_on']
        normalisedlink = pandas.json_normalize(results)['uri']
        normalisedimages = pandas.json_normalize(results)['photos']
        normalisedspecies = pandas.json_normalize(results)['species_guess']

        #Create Dataframe with all variables
        newObs = pandas.DataFrame(normalisedloc)['location'].str.split(',',  expand=True)
        newObs.rename(columns={0:'x', 1:'y'}, inplace=True)
        newObs["Taxon"] = userInput
        newObs['Time'] = normalisedtime
        newObs["Link"] = normalisedlink
        newObs["Images"] = normalisedimages
        newObs["Species"] = normalisedspecies

        idlist = pandas.json_normalize(results)['id']
        lastid = idlist[len(idlist) - 1]

        geodf = geopandas.GeoDataFrame(data=newObs, geometry=geopandas.points_from_xy(newObs.y, newObs.x, crs="EPSG:4326"))
        print(f"Data Pull for page {i} of taxon {taxon} complete")
        print(geodf)
        print(f"Taxon Number is {n}")
        print(f"Run Number is {i}")

        if n == 0 and i == 1:
            combinedgeodf = geodf
            print("First Run of First Taxon")
 
        else:
           combinedgeodf = pandas.concat([combinedgeodf, geodf])
           print("Post First Run")

        print(f"Current Total Run Table is {combinedgeodf}")

    print(f"Taxon {taxon} data pull completed")

print("Outputing to New Shapefile")
combinedgeodf.to_file("BirdsDataLayer.shp")

      