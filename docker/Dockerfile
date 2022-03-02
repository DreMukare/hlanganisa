FROM python:3.6

ADD . /app
WORKDIR /app
ENV VIRTUAL_ENV=/opt/venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

# Install dependencies:
WORKDIR /app/backend
RUN pip install -r requirements.txt

# Run the application
EXPOSE 8000
CMD ["gunicorn", "-b", "0.0.0.0:8000", "api.v1.app:app"]
