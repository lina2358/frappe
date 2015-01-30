# Copyright (c) 2013, Web Notes Technologies Pvt. Ltd. and Contributors
# See license.txt

import frappe
import unittest
import re

test_records = frappe.get_test_records('Print Format')

class TestPrintFormat(unittest.TestCase):
	def test_print_user(self, style=None):
		print_html = frappe.get_print("User", "Administrator", style=style)
		self.assertTrue("<label>First Name</label>" in print_html)
		self.assertTrue(re.findall('<div class="col-xs-7[\s]*">[\s]*Administrator[\s]*</div>', print_html))
		return print_html

	def test_print_user_standard(self):
		print_html = self.test_print_user("Standard")
		self.assertTrue(re.findall('\.print-format {[\s]*font-size: 9pt;', print_html))
		self.assertFalse(re.findall('th {[\s]*background-color: #eee;[\s]*}', print_html))
		self.assertFalse("font-family: serif;" in print_html)

	def test_print_user_modern(self):
		print_html = self.test_print_user("Modern")
		self.assertTrue(re.findall('th {[\s]*background-color: #eee;[\s]*}', print_html))

	def test_print_user_classic(self):
		print_html = self.test_print_user("Classic")
		self.assertTrue("font-family: serif;" in print_html)
