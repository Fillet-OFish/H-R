from tempfile import NamedTemporaryFile
import os
import csv
import shutil
import datetime

if __name__ == '__main__':
    script_dir = os.path.dirname(__file__)
    rel_path = 'CSV_Files/reviews.csv'
    tempfile = NamedTemporaryFile('w+t', delete=False)
    with open(os.path.join(script_dir, rel_path), 'r') as csvFile, tempfile:
        fieldnames = ['id', 'product_id', 'rating', 'date', 'summary', 'body', 'recommend', 'reported', 'reviewer_name', 'reviewer_email', 'response', 'helpfulness']
        reader = csv.DictReader(csvFile, delimiter=',', quotechar='"')
        writer = csv.DictWriter(tempfile, fieldnames=fieldnames, delimiter=',', quotechar='"')
        writer.writeheader()
        for row in reader:
            row['date'] = datetime.date.fromtimestamp(int(row['date'])/1000.0)
            writer.writerow(row)
    shutil.move(tempfile.name, os.path.join(script_dir, 'CSV_Files/parsedReviews.csv'))

# import csv
# import datetime

# with open('data.csv', newline='') as csvfile, open('cleaned.csv', 'w', newline='') as cleanedfile:
#     reader = csv.DictReader(csvfile, delimiter=',', quotechar='"')
#     fieldnames = ["id","product_id","rating","date","summary","body","recommend","reported","reviewer_name","reviewer_email","response","helpfulness"]
#     writer = csv.DictWriter(cleanedfile, fieldnames=fieldnames, delimiter=',', quotechar='"')
#     writer.writeheader()
#     for row in reader:
#         print(datetime.date.fromtimestamp(int(row['date'])/1000))
#         print(row['reported'])
#         temp = datetime.date.fromtimestamp(int(row['date'])/1000)
#         row['date'] = temp
#         writer.writerow(row)

# if row['reported'] == 0:
#   row['reported'] = 'false'
# else:
#   row['reported'] = 'true'