import boto3
import os
from dotenv import load_dotenv


load_dotenv()
# AWS credentials (Use environment variables or IAM roles instead for security)
AWS_ACCESS_KEY = os.getenv("S3_ACCESS_KEY")
AWS_SECRET_KEY =  os.getenv("S3_SECRET_ACCESS_KEY")
BUCKET_NAME = os.getenv("S3_BUCKET_NAME")




# Initialize S3 client (No region specified)
s3 = boto3.client(
    "s3",
    aws_access_key_id=AWS_ACCESS_KEY,
    aws_secret_access_key=AWS_SECRET_KEY
)

def upload_text_to_s3(text_content, key):
    """
    Uploads a string as a text file to S3 and returns the public URL.
    """
    try:
        s3.put_object(
            Bucket=BUCKET_NAME,
            Key=key,
            Body=text_content,
            ContentType="text/plain"  # Set correct content type
        )
        
        file_url = f"https://{BUCKET_NAME}.s3.amazonaws.com/{key}"
        print("File uploaded successfully:", file_url)
        return file_url

    except Exception as e:
        print("Error uploading to S3:", e)
        raise

def get_recording_url(filename):
    file_url = f"https://{BUCKET_NAME}.s3.amazonaws.com/{filename}"
    return file_url
