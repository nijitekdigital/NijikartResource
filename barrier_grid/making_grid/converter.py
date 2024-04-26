import os
import time
import natsort
import urllib.parse
from playwright.sync_api import sync_playwright

# taking screen shot of grid 

def convert_svg_to_pdf(url, output_pdf_name):
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Navigate to the HTML file containing the canvas
        page.goto(f'{url}')

        # Wait for the canvas to be fully rendered
        page.wait_for_selector('.the-frames')

        # Capture a screenshot of the canvas
        canvas_element = page.query_selector('.the-frames')
        screenshot = canvas_element.screenshot()


        # Save the screenshot as a JPG image file
        with open(output_pdf_name, 'wb') as f:
            f.write(screenshot)

        browser.close()

#-----------------------to pdf-------------------------------------------------------------

# def convert_svg_to_pdf(url, output_pdf_name):
    
    

#     with sync_playwright() as p:
#         browser = p.chromium.launch()
#         page = browser.new_page()

#         # Encode the file path to handle spaces and special characters
#         # encoded_svg_file_path = urllib.parse.quote(svg_file_path)

#         # # Load the SVG file as a URL
#         # page.goto(f'file://{encoded_svg_file_path}')

#         # # Load the SVG file as a URL
#         page.goto(url)

#         page.wait_for_load_state('networkidle')
#         # time.sleep(30)
#         # Generate PDF from the loaded SVG content
#         page.pdf(path=output_pdf_name)

#         print(f'PDF generated successfully from {url}.')

#         browser.close()
#------------------------------------------------------------------------------------------

# Example usage
html_file_path = os.path.join(os.getcwd(), 'index.html')
output_image_path = os.path.join(os.getcwd(), 'spiral.jpg')#for jpg
# output_image_path = os.path.join(os.getcwd(), 'spiral.pdf')#for pdf
# capture_canvas_screenshot(html_file_path, output_image_path)
convert_svg_to_pdf(html_file_path, output_image_path)
