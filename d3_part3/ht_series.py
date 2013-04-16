#!/usr/bin/env python
"""
Script generates CSV files containing hashtag occurrence over time
in a database of tweets.
"""

import MySQLdb
import getpass
import argparse
import csv

parser = argparse.ArgumentParser()
parser.add_argument("--dbhost", type=str, help="name of the database server", default='localhost')
parser.add_argument("-u", "--dbuser", type=str, help="name of the database user", default='root')
parser.add_argument("-p", "--dbpass", help="name of the database user", action='store_true')
parser.add_argument("--dbname", type=str, help="name of the database schema", required=True)

parser.add_argument("--start", type=str, help="the query start date", default='2013-02-03 23:00:00')
parser.add_argument("--stop", type=str, help="the query stop date", default='2013-02-04 04:30:00')
parser.add_argument("--interval", "-i", type=int, help="the time grouping in seconds", default=5 * 60)
parser.add_argument("--hashtag", "-ht", type=str, help="the query hashtag", default='superbowl')

parser.add_argument("csvfile", type=str, help="name of the csv file to write to")

# parse args
args = parser.parse_args()

# grab db password
if args.dbpass:
	args.dbpass = getpass.getpass('enter database password: ')
else:
	args.dbpass = ''

print "Connecting to db... (%s@%s %s)"%(args.dbuser,args.dbhost, args.dbname)
db = MySQLdb.connect(host=args.dbhost, user=args.dbuser, passwd=args.dbpass, db=args.dbname, charset='utf8', use_unicode=True)
cursor = db.cursor()

replacements = {
    'START_TIME': args.start,
    'STOP_TIME': args.stop,
    'INTERVAL': args.interval,
    'HASHTAG': args.hashtag
}

SELECT_TWEET_COUNTS = """
    SELECT UNIX_TIMESTAMP('%(START_TIME)s') + 
           %(INTERVAL)d * FLOOR((UNIX_TIMESTAMP(created_at)-UNIX_TIMESTAMP('%(START_TIME)s'))
           / %(INTERVAL)d) AS binned_time,
        COUNT(*) as count,
        SUM(IF(sentiment=1,1,0)) AS positive,
        SUM(IF(sentiment=0,1,0)) AS neutral,
        SUM(IF(sentiment=-1,1,0)) AS negative
    FROM tweets, hashtags, hashtag_uses
    WHERE NOT is_retweet
    AND created_at >= '%(START_TIME)s'
    AND created_at < '%(STOP_TIME)s'
    AND tweets.id = hashtag_uses.tweet_id
    AND hashtag_uses.hashtag_id = hashtags.id
    AND hashtags.string = '%(HASHTAG)s'
    GROUP BY binned_time
    ORDER BY binned_time"""

cursor.execute(SELECT_TWEET_COUNTS % replacements)
with open(args.csvfile, 'wb') as outfile:
    writer = csv.writer(outfile)
    writer.writerow(['time', 'count', 'positive', 'neutral', 'negative'])
    
    for row in cursor.fetchall():
        writer.writerow(row)
