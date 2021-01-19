import json

from flask import Flask, render_template
import pandas as pd
import copy
import pickle
app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

# ABSOLUTE_LOCATION = "/Users/dingyuhao/Downloads/d3-flask-blog-post-master/"
ABSOLUTE_LOCATION = ""
NYUsh = ["Keith Ross, NYU", "Romain, NYU","Shuyang Ling, NYU","Enric Junque, NYU","Zhibin Chen, NYU", "Gus Xia, NYU", "Ratan Dey, NYU", "Xianbin Gu, NYU", "Siyao Guo, NYU", 'Oliver Marin, NYU', "Zheng Zhang, NYU","Bruno Abrahao, NYU" ]
NYU = ["Foster Provost, NYU", "Yevgeniy Dodis, NYU", "Yong Liu, NYU",'Anasse Bari, NYU',
 'Megan Coffee, NYU',
 'Rafael M',
 'Moraes, NYU',
 'Doruk Kilitcioglu, NYU',
 'Richard Bonneau, NYU',
 'Jonathan Nagler, NYU',
 'Jane Skok, NYU',
 'Joan Bruna, NYU',
 'Emily Denton, NYU',
 'Kyunghyun Cho, NYU',
 'Sébastien Jean, NYU',
 'Clement Farabet, NYU']
NYUad = ['Azza Abouzied, NYU', 'Maeda F', 'Hanafi, NYU',
 'Miro Mannino, NYU',
 'Nizar Habash, NYU',
 'Nasser Zalmout, NYU',
 'Salam Khalifa, NYU',
 'Bashar Alhafni, NYU',
 'Talal Rahwan, NYU',
 'Marcin Waniek, NYU',
 'Yasir Zaki, NYU',
 'Talal Ahmad, NYU',
 'Christina Pöpper, NYU',
 'Shujaat Mirza, NYU']

names = NYUsh + NYU + NYUad
n_names = []
for i in names:
    n_names.append(i.rstrip(', NYU'))

import numpy
def bubble_chart_data(NAME):
    
    # pub_dict data
    global ABSOLUTE_LOCATION
    a_file = open(ABSOLUTE_LOCATION +  "static/assets/data/pub_dict.pkl", "rb")
    pub_dict = pickle.load(a_file)
    print("pub_dict Data Loaded")
    count = 0
    publication_all = pd.read_csv(ABSOLUTE_LOCATION +  'static/assets/data/publication_all.csv', index_col = None)
    bubble_chart = publication_all[publication_all['name'] == NAME]
    bubble_chart['nc'] = 1
    #print(bubble_chart)
    for i in bubble_chart.index:
        paper = bubble_chart.at[i, "title"]
        if paper in pub_dict:
            nc_ = pub_dict[paper]
        else:
            nc_ = numpy.random.choice(numpy.arange(1,6), p = [0.25, 0.25, 0.25, 0.15, 0.1])
#             if count == 10:
#                 pg = ProxyGenerator()
#                 ipp = ast.literal_eval(str(opener.open('http://lumtest.com/myip.json').read()).strip("\'b"))['ip']
#                 pg.SingleProxy(http = 'http://lum-customer-hl_049c2419-zone-static:30fo3h826dk0@zproxy.lum-superproxy.io:22225', https = 'http://lum-customer-hl_049c2419-zone-static:30fo3h826dk0@zproxy.lum-superproxy.io:22225')
#                 scholarly.use_proxy(pg)
#                 count = 0
#                 print(len(pub_dict))
#             search_query = scholarly.search_pubs(paper)
#             pub_info = str(next(search_query))
#             nc_ = len(pub_info[pub_info.index('author') + 9 : pub_info.index(']') + 1].split(','))
#             pub_dict[paper] = nc_
#             print("success")
#             count += 1
        
        bubble_chart.at[i, 'nc'] = nc_
    return bubble_chart



@app.route("/")
def home():
    return render_template("index5.html", SCHOOL = "NYU", SCHOOL_ = "NYU")

@app.route("/NYU_Shanghai")
def home1():
    return render_template("index5.html", SCHOOL = "NYU Shanghai", SCHOOL_ = "NYUsh")

@app.route("/NYU_AbuDhabi")
def home2():
    return render_template("index5.html", SCHOOL = "NYU AbuDhabi", SCHOOL_ = "NYUad")

@app.route("/<name>")
def index(name):
    print(name)
    
    nname = name.split(",")[0]
    cites_per_year = pd.read_csv(ABSOLUTE_LOCATION +  'static/assets/data/cites_per_year.csv')
    cites_ = cites_per_year[cites_per_year['name'] == nname]
    dd2 = []
    for (columnName, columnData) in cites_.iteritems():
        if columnData.iloc[0] != 0 and columnName!= 'name':
            #if int(columnName) >= 2011:
                print(columnName)
                print(columnData.iloc[0])
                dd2.append({'year':int(columnName), 'value': int(columnData.iloc[0])})
    # Getting Gender
    gender = pd.read_csv(ABSOLUTE_LOCATION +  'static/assets/data/gender.csv', index_col = False)
    gender_data = gender[gender['name'] == nname]
    print(gender_data)
    if len(gender_data) == 2:
        print("doubled")
        gender_data = gender_data.iloc[0]
    male_number = int(gender_data['male'])
    female_number = int(gender_data['female'])
    if male_number == 0 and female_number == 0:
        male_number = 1
    

    # Getting Ethnics
    df = pd.read_csv(ABSOLUTE_LOCATION +  'static/assets/data/race.csv')
    df = df[df['name'] == nname]
    d = df.to_dict()
    del d['name']
    #print(d)
    for i in d:
        d[i] = list(d[i].values())[0]
    #print(d)
    sorted_keys = sorted(d, key=d.get, reverse = True)  # [1, 3, 2]
    dd = []
    for i in sorted_keys:
        if d[i] != 0:
         dd.append({"Country": i.split(',')[-1], "Value": d[i]})
    #print(dd)
    if len(dd) == 0:
        dd.append({"Country": "Jews", "Value": 1})
    data = {'chart_data': dd}
    #print(data)
    coauthor_all = pd.read_csv(ABSOLUTE_LOCATION +  'static/assets/data/coauthor_all.csv')
    this_author = coauthor_all[coauthor_all['name'] == nname]
    dictt = {}
    dictt2 = {}
    tt_total = pd.DataFrame()
    for i in this_author.iterrows():
        lat = i[1]['lat']
        lng = i[1]['lng']
        if (lat,lng) not in dictt:
            dictt[(lat,lng)] = 1
            dictt2[(lat,lng)] = i[1]['coauthorname']
        else:
            dictt[(lat,lng)] += 1
            dictt2[(lat,lng)] += ", " +  i[1]['coauthorname']
    for i in dictt:
        new_ll = {"homelat": i[0] , "homelon": i[1] , "n": dictt[i],"tooltip_name": dictt2[i]}
        tt_total = tt_total.append([copy.deepcopy(new_ll)])
    if len(tt_total) == 0:
        tt_total = tt_total.append([{"homelat": 40.729513, "homelon": -73.996461, "n": 1,"tooltip_name": "fake data"}])
    tt_total.to_csv(ABSOLUTE_LOCATION +  'static/assets/data/coauthor.csv', index = False)
    # Bubble chart
    bubble_chart = bubble_chart_data(name)
    finalbubble = pd.DataFrame()
    cccc = 0
    for i in bubble_chart.iterrows():
        if i[1]['year'] > 2000 and i[1]['cites'] <= 2000:
            cccc += 1
            finalbubble = finalbubble.append([{"year": i[1]['year'], "size" : i[1]['nc'], 'distance': i[1]['cites'], 'title': i[1]['title']}])
            if cccc == 50:
                break
    finalbubble.to_csv(ABSOLUTE_LOCATION +  'static/js/data_bubble', index = False)
    

    return render_template("index.html", my_data=data, content = "Fabulous", \
        school = "NYU Shanghai", nname = nname, male_number = male_number, \
            female_number = female_number, SCHOOL = "NYU", my_data2 = dd2)

@app.route("/race/<name>")
@app.route("/race/<name>/<typeaa>")
def func(name = "NYUsh", typeaa = ""):
    if len(typeaa) == 0:
        getcsvname = "race_chart_" + typeaa + name
        print(getcsvname)
        df = pd.read_csv(ABSOLUTE_LOCATION +  "static/assets/data/" + "race_chart_" + typeaa + name)
        df.to_csv(ABSOLUTE_LOCATION +  "static/js/data", index = False)
        return render_template("index2.html", name = name)
    else:
        getcsvname = "race_chart_" + typeaa + name
        print(getcsvname)
        df = pd.read_csv(ABSOLUTE_LOCATION +  "static/assets/data/" + "race_chart_" + typeaa + name)
        df.to_csv(ABSOLUTE_LOCATION +  "static/js/data", index = False)
        return render_template("index3.html", name = name)


if __name__ == "__main__":
    app.run()
