from tempfile import NamedTemporaryFile
import os
import csv
import shutil
import datetime

if __name__ == '__main__':
    script_dir = os.path.dirname(__file__)
    rel_path = 'rawData/answers.csv'
    tempfile = NamedTemporaryFile('w+t', newline='', delete=False)
    with open(os.path.join(script_dir, rel_path), 'r', newline='') as csvFile, tempfile:
        fieldnames = ['id', 'question_id', 'body', 'date_written', 'answerer_name', 'answerer_email', 'reported', 'helpful']
        reader = csv.DictReader(csvFile, delimiter=',', quotechar='"')
        writer = csv.DictWriter(tempfile, fieldnames=fieldnames, delimiter=',', quotechar='"')
        writer.writeheader()
        for row in reader:
            row['date_written'] = datetime.date.fromtimestamp(int(row['date_written'])/1000.0)
            if row['reported'] == 0:
                row['reported'] = 'false'
            else:
                row['reported'] = 'true'
            writer.writerow(row)
    shutil.move(tempfile.name, os.path.join(script_dir, 'rawData/cleanedAnswers.csv'))