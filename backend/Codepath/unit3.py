# def count_mississippi(limit):
#     for num in range(1, limit):
#         print( f"{num} mississippi")
# count_mississippi(6);

# def swap_ends(my_str):
#     if len(my_str) < 2: # t
#         return my_str
#     return my_str[-1] + my_str[1:-1] + my_str[0]

# my_str = "tb"
# swapped = swap_ends(my_str)
# print(swapped)


# def is_pangram(my_str):
#     str= "abcdefghijklmnopqrstuvwxyz"
#     for i in str:
#         if i not in my_str:
#             return False
#     return True


# my_str = "The quick brown fox jumps over the lazy dog"
# print(is_pangram(my_str))
    
# str2 = "The dog jumped"
# print(is_pangram(str2))



# def reverse_string(my_str):
#     return my_str[::-1] #start stop step
# my_str = "live" #evil  
# print(reverse_string(my_str))

def first_unique_char(my_str):
    char_couter = counter(my_str)
    for i in char in enumerate(my_str):
        if 
