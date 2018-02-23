<?php
/**
*   Copyright (C) 2014 University of Central Florida, created by Jacob Bates, Eric Colon, Fenel Joseph, and Emily Sachs.
*
*   This program is free software: you can redistribute it and/or modify
*   it under the terms of the GNU General Public License as published by
*   the Free Software Foundation, either version 3 of the License, or
*   (at your option) any later version.
*
*   This program is distributed in the hope that it will be useful,
*   but WITHOUT ANY WARRANTY; without even the implied warranty of
*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*   GNU General Public License for more details.
*
*   You should have received a copy of the GNU General Public License
*   along with this program.  If not, see <http://www.gnu.org/licenses/>.
*
*   Primary Author Contact:  Jacob Bates <jacob.bates@ucf.edu>
*/
class UdoitStats
{
    private static $instance;

    public static function instance()
    {
        if (!isset(self::$instance)) {
            self::$instance = new UdoitStats();
        }

        return self::$instance;
    }

    /**
     * Gets a list of reports (scans)
     * 
     * @param  startDate 	Earliest date of report to include
     * @param  endDate 		Latest date of report to include
     * @param  term 		(Optional) Only include reports generated for courses within this Canvas term ID
     * @param  course_id 	(Optional) Only include reports corresponding to this Canvas course ID
     * @param  user_id 		(Optional) Only include reporst generated by this Canvas user ID
     */
    public function getReports($startDate, $endDate, $term=false, $course_id=false, $user_id=false)
    {

    }

	/**
     * Gets the latest report from each course, and counts how many issues (errors + suggestions)
     * were found in that report.
     * 
     * @param  startDate 	Earliest date of report to include
     * @param  endDate 		Latest date of report to include
     * @param  term 		(Optional) Only include reports generated for courses within this Canvas term ID
     * @param  user_id 		(Optional) Only include reporst generated by this Canvas user ID
     */
    public function countIssuesPerCourse($startDate, $endDate, $term=false, $user_id=false)
    {

    }

    /**
     * Tallys up number of reports generated (scans performed) by each user
     * @param  grain 		How granular the tally is.  Accepted values: day, week, month
     * @param  startDate 	Earliest date of report to include
     * @param  endDate 		Latest date of report to include
     * @param  term 		(Optional) Only include reports generated for courses within this Canvas term ID
     */
    public function countReportsPerUser($grain, $startDate, $endDate, $term=false)
    {

    }

    /**
     * Tallys up number of new users per period defined by grain.
     * @param  grain 		How granular the tally is.  Accepted values: day, week, month
     * @param  startDate 	Earliest date of report to include
     * @param  endDate 		Latest date of report to include
     */
    public function countNewUsers($grain, $startDate, $endDate)
    {

    }

    /**
     * Gets every user in the database.
     */
    public function getUsers()
    {
    	//TODO:  Paginate this by adding a page parameter and modifying the query
    	global $db_user_table;

    	$sth = UdoitDB::prepare("SELECT id, date_created, canvas_url FROM {$db_user_table}");    	

    	if ($sth->execute()) {
    		return $sth->fetchAll(PDO::FETCH_ASSOC);
    	} else {
    		return false;
    	}
    }
}