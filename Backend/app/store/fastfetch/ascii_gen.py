from pyfiglet import Figlet

def generate_banner(text, width=80, font="slant"):
    f = Figlet(font=font, width=width)
    banner = f.renderText(text)
    return banner

def add_box(text_block, width=80):
    lines = text_block.split("\n")
    padded = [line.ljust(width - 4) for line in lines]

    top = "█" * width
    middle = [f"██ {line} ██" for line in padded]
    bottom = "█" * width

    return "\n".join([top] + middle + [bottom])

def colorize(text, color_code="32"):
    return f"\033[1;{color_code}m{text}\033[0m"

if __name__ == "__main__":
    text = input("Enter text: ")
    banner = generate_banner(text)
    boxed = add_box(banner)

    print(colorize(boxed, "36"))  # cyan output