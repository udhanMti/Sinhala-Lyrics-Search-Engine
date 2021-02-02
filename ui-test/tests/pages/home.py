from pypom import Page
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait



class HomePage(Page):
    """Interact with elements on the home page."""

    #_home_button_locator = (By.CSS_SELECTOR, "header .site-title")
    _english_language_button_locator = (By.XPATH, '//button[text()="English"]')
    _sinhala_language_button_locator = (By.XPATH, '//button[text()="සිංහල"]')
    _basic_search_button_locator = (By.XPATH, '// *[ @ id = "mat-tab-label-0-0"] / div')
    _advance_search_button_locator = (By.XPATH, '// *[ @ id = "mat-tab-label-0-1"] / div')
    _basic_search_label_locator = (By.XPATH, '// *[ @ id = "mat-tab-content-0-0"] / div / div[1]')
    _advance_search_label_locator = (By.XPATH, '// *[ @ id = "mat-tab-content-0-1"] / div / div[1]')

    def __init__(self, selenium, base_url=None, timeout=10, **url_kwargs):
        super().__init__(selenium, base_url=base_url, timeout=timeout, **url_kwargs)

    @property
    def is_english_language_button_present(self):
        return self.is_element_present(*self._english_language_button_locator)

    @property
    def is_sinhala_language_button_present(self):
        return self.is_element_present(*self._sinhala_language_button_locator)

    @property
    def is_basic_search_present(self):
        return self.is_element_present(*self._basic_search_label_locator)

    @property
    def is_advance_search_present(self):
        return self.is_element_present(*self._advance_search_label_locator)

    def click_sinhala_language_button(self):
        self.find_element(*self._sinhala_language_button_locator).click()
    
    def click_english_language_button(self):
        self.find_element(*self._english_language_button_locator).click()

    def click_basic_search_si_button(self):
        self.find_element(*self._basic_search_button_locator).click()

    def click_basic_search_en_button(self):
        self.find_element(*self._basic_search_button_locator).click()

    def click_advance_search_si_button(self):
        self.find_element(*self._advance_search_button_locator).click()

    def click_advance_search_en_button(self):
        self.find_element(*self._advance_search_button_locator).click()