import shutil
import os
import NamedTemporaryFile


if __name__ == '__main__':
  script_dir = os.path.dirname(__file__)
  rel_path = './CSV_Files/reviews.csv'
  tempfile = NamedTemporaryFile('w+t', newline='', delete=False)

  with open(os.path.join(script_dir, rel_path), 'r', newline='') as csvFile, tempfile:
    reader = csv.DictReader(csvFile, delimiter=',', quotechar='"')
    writer = csv.writer(tempfile, delimiter=',', quotechar='"')

    for row in reader:
      print(row)
      row['date_written'] = datetime.date.fromtimestamp(int(row['date_written'])/1000.0)

      row['reported'] = bool(row['reported'])

      writer.writerow(row.values())

  shutil.move(tempfile.name, os.path.join(script_dir, './CSV_Files/reviews.csv'))
