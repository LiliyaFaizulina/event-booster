import axios from 'axios';
export class EventsAPI {
  BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events';
  key = 'tIj1kC332ExvV8vs1uBAp1fasaO5ERpG';
  size = 16;
  page = 0;

  async getEvents(keyword) {
    const config = {
      params: {
        apikey: this.key,
        size: this.size,
        page: this.page,
      },
    };
    if (keyword) {
      config.params.keyword = keyword;
    }
    return await axios.get(this.BASE_URL, config);
  }

  async getEventsByCountry(code) {
    const config = {
      params: {
        apikey: this.key,
        size: this.size,
        page: this.page,
        countryCode: 'PL',
      },
    };
    if (code) {
      config.params.countryCode = code;
    }
    return await axios.get(this.BASE_URL, config);
  }

  async getEvent(id) {
    const config = {
      params: {
        apikey: this.key,
        id,
      },
    };
    return await axios.get(this.BASE_URL, config);
  }

  setPage(p) {
    this.page = p;
  }

  increasePage() {
    this.page += 1;
  }

  setCountryCode(code) {
    this.countryCode = code;
  }
}
