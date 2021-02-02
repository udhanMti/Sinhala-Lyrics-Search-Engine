import unittest

from selenium import webdriver
from selenium.webdriver.firefox.options import Options

from tests.pages.home import HomePage

HEADLESS = True
BASE_URL = "http://localhost:4200"

driver = None

def setUpRun():
    """Setup the webdriver."""

    global driver

    options = Options()
    if HEADLESS:
        options.add_argument('-headless')

    print("Create a new Firefox session")
    driver = webdriver.Firefox(options=options)

    print("Set implicitly wait")
    driver.implicitly_wait(15)
    print("Window size: {width}x{height}".format(**driver.get_window_size()))


def tearDownRun():
    """Close the webdriver."""

    global driver

    print("Close the Firefox session")
    driver.quit()

class UITestModel(unittest.TestCase):

    def setUpModel(self):
        global driver

        print("Set up for: {}".format(type(self).__name__))
        self.driver = driver

    def v_Start(self):
        print("Starting...")

    def v_SinhalaPage(self):
        page = HomePage(self.driver)
        self.assertTrue(page.is_sinhala_language_button_present, "Sinhala language button should be present.")
        self.assertTrue(page.is_basic_search_present, "Sinhala basic search box should be present.")

    def v_EnglishPage(self):
        page = HomePage(self.driver)
        self.assertTrue(page.is_english_language_button_present, "English language button should be present.")
        self.assertTrue(page.is_basic_search_present, "English basic search box should be present.")

    def v_SinhalaAdvancedSearch(self):
        page = HomePage(self.driver)
        self.assertTrue(page.is_sinhala_language_button_present, "Sinhala language button should be present.")
        self.assertTrue(page.is_advance_search_present, "Sinhala advance search box should be present.")

    def v_EnglishAdvancedSearch(self):
        page = HomePage(self.driver)
        self.assertTrue(page.is_english_language_button_present, "English language button should be present.")
        self.assertTrue(page.is_advance_search_present, "English advance search box should be present.")

    def e_openApp(self):
        print("Load the search engine homepage from: {}".format(BASE_URL))

        page = HomePage(self.driver, BASE_URL)
        page.open()

    def e_changeLanguageToSi(self):
        page = HomePage(self.driver)
        page.click_english_language_button()

    def e_changeLanguageToEn(self):
        page = HomePage(self.driver)
        page.click_sinhala_language_button()

    def e_goToBasicSearchSi(self):
        page = HomePage(self.driver)
        page.click_basic_search_si_button()

    def e_goToBasicSearchEn(self):
        page = HomePage(self.driver)
        page.click_basic_search_en_button()

    def e_goToAdvanceSearchSi(self):
        page = HomePage(self.driver)
        page.click_advance_search_si_button()

    def e_goToAdvanceSearchEn(self):
        page = HomePage(self.driver)
        page.click_advance_search_en_button()

