import unittest

from fractions import Fraction
from my_sum import sum
from my_sum import even


class TestSum(unittest.TestCase):
    def test_list_int(self):
        """
        Test that it can sum a list of integers
        """
        data = [1, 2, 3]
        result = sum(data)
        self.assertEqual(result, 6)

    def test_list_fraction(self):
        """
        Test that it can sum a list of fractions
        """
        data = [Fraction(1, 4), Fraction(1, 4), Fraction(2, 4)]
        result = sum(data)
        self.assertEqual(result, 1)

    def test_number_even(self):
        """
        Test that it verify if a number is even or not 
        """
        result1 = even(23)
        result2 = even(24)
        self.assertFalse(result1)
        self.assertTrue(result2)


        
if __name__ == '__main__':
    unittest.main()