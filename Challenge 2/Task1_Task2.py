import random
import time

# Task 1 - Find the most frequent integer in an array?

def most_frequent_integer(array):
    # Create a dictionary with the number of times each integer appears in the array
    counter = {}
    for i in array:
        if i in counter:
            counter[i] += 1
        else:
            counter[i] = 1

    # Find the most frequent integer
    most_frequent = 0
    for i in counter:
        if counter[i] > most_frequent:
            most_frequent = i

    return most_frequent

# Task 2 - Reverse a String iteratively and recursively

def reverse_string_iterative(string):
    reversed_string = ""
    for i in range(len(string)):
        reversed_string += string[len(string) - 1 - i]
    return reversed_string

def reverse_string_recursive(string):
    if len(string) == 1:
        return string
    else:
        return string[len(string) - 1] + reverse_string_recursive(string[0:len(string) - 1])

# Random Int array generator - duplicates allowed

def random_int_array(length, min, max):
    array = []
    for i in range(length):
        array.append(random.randint(min, max))
    return array

# Random String generator

def random_string(length):
    string = ""
    for i in range(length):
        string += chr(random.randint(97, 122))
    return string

# Timer to test the speed of the functions in milliseconds

def timer(function, *args):
    start = time.time()
    function(*args)
    end = time.time()
    return (end - start) * 10e3


if __name__ == "__main__":

    # Test array for most_frequent_integer
    mfi_test_array = random_int_array(100000, 0, 10)

    # Test string for reverse_string_iterative and reverse_string_recursive
    rsi_test_string = random_string(750)

    # Print truncated test arrays and strings
    print("Most Frequent Integer Test Array: ", mfi_test_array[0:10], "...")
    print("Reverse String Iterative Test String: ", rsi_test_string[0:10], "...")

    # Test the functions
    print("\nMost frequent integer in array: " +
          str(most_frequent_integer(mfi_test_array)))
    print("Time Taken in milliseconds: " +
          str(timer(most_frequent_integer, mfi_test_array)))
    print("\nReverse string iteratively: " +
          reverse_string_iterative(rsi_test_string))
    print("Time Taken in milliseconds: " +
          str(timer(reverse_string_iterative, rsi_test_string)))
    print("\nReverse string recursively: " +
          reverse_string_recursive(rsi_test_string))
    print("Time Taken in milliseconds: " +
          str(timer(reverse_string_recursive, rsi_test_string)))
