import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lyrics-search-engine';
  result_boundary = 50;
  search_pressed;
  error_present;
  no_result;
  
  lan_selected;
  lan_selected_dict;
  retrievedLyrics = [];
  filteredLyrics = [];

  aggs_artist = [];
  aggs_lyric_wrt = [];
  aggs_genre = [];

  lan_dictionary_en = {
    'page-header': 'Sinhala Lyrics Search',
    'tab-label-1': 'Basic Search',
    'tab-label-2': 'Advanced Search',
    'basic-input-placeholder': 'Search Lyrics',
    'adv-input-label-1': 'Song Name',
    'adv-input-label-2': 'Artist',
    'adv-input-label-3': 'Genre',
    'adv-input-label-4': 'Written By',
    'adv-input-label-5': 'Music By',
    'adv-input-label-6': 'Key',
    'adv-input-label-7': 'Beat',
    'button': 'Search',
    'error-message': 'Sorry. Internal Server Error !',
    'no-result-message': 'No Lyrics Found'
  }

  lan_dictionary_sn = {
    'page-header': 'සිංහල ගී පද',
    'tab-label-1': 'මූලික සෙවීම',
    'tab-label-2': 'උසස් සෙවීම',
    'basic-input-placeholder': 'පද රචනා සොයන්න',
    'adv-input-label-1': 'ගීතයේ නම',
    'adv-input-label-2': 'ගායකයා',
    'adv-input-label-3': 'Genre',
    'adv-input-label-4': 'පද රචනය',
    'adv-input-label-5': 'සංගීතය',
    'adv-input-label-6': 'Key',
    'adv-input-label-7': 'Beat',
    'button': 'සොයන්න',
    'error-message': 'සමාවන්න. සේවාදායක දෝෂයකි !',
    'no-result-message': 'පද රචනා නැත'
  }


  ngOnInit() {
    this.lan_selected_dict = this.lan_dictionary_sn;
    this.lan_selected = 'sn';
    this.search_pressed = false;
    this.error_present = false;
    this.no_result = false;
  }


  toggleLanguage() {
    if(this.lan_selected == 'en') {
      this.lan_selected = 'sn';
      this.lan_selected_dict = this.lan_dictionary_sn;
      $('.toggle-lan').removeClass('btn-light');
      $('.toggle-lan').addClass('btn-success');
      $('.toggle-lan').html('සිංහල');
    } else {
      this.lan_selected = 'en';
      this.lan_selected_dict = this.lan_dictionary_en;
      $('.toggle-lan').removeClass('btn-success');
      $('.toggle-lan').addClass('btn-light');
      $('.toggle-lan').html('English');
    }
  }


  lyricSearch() {
    this.search_pressed = true;
    this.error_present = false;
    this.no_result = false;
    this.retrievedLyrics = [];
    this.filteredLyrics = [];
    this.aggs_artist = [];
    this.aggs_lyric_wrt = [];
    this.aggs_genre = [];

    let query = $('#basic_search_query').val();

    $.ajax({
      type: "POST",
      url: "http://127.0.0.1:5002/basicsearch",
      data: {query: query, size: this.result_boundary, language: this.lan_selected},
      success: res => {
        console.log(res.hits.hits)
        console.log(res.aggregations)

        this.search_pressed = false;
        let count = 0;

        if(res.hits.hits.length == 0) {
          this.no_result = true;
        }

        res.hits.hits.forEach(element => {
          if(element._score > 100) {
            this.retrievedLyrics.push(element._source)
            count += 1
          }
        });

        if(this.retrievedLyrics.length == 0) {
          res.hits.hits.forEach(element => {
            if(element._score > 60) {
              this.retrievedLyrics.push(element._source)
              count += 1
            }
          });
        }
        if(this.retrievedLyrics.length == 0) {
          res.hits.hits.forEach(element => {
            if(element._score > 30) {
              this.retrievedLyrics.push(element._source)
              count += 1
            }
          });
        }
        if(this.retrievedLyrics.length == 0) {
          res.hits.hits.forEach(element => {
            if(element._score > 20) {
              this.retrievedLyrics.push(element._source)
              count += 1
            }
          });
        }
        if(this.retrievedLyrics.length == 0) {
          res.hits.hits.forEach(element => {
            if(element._score > 10) {
              this.retrievedLyrics.push(element._source)
              count += 1
            }
          });
        }
        if(this.retrievedLyrics.length == 0) {
          res.hits.hits.forEach(element => {
            if(element._score > 5) {
              this.retrievedLyrics.push(element._source)
              count += 1
            }
          });
        }
        if(this.retrievedLyrics.length == 0) {
          res.hits.hits.forEach(element => {
            if(count < this.result_boundary/2) {
              this.retrievedLyrics.push(element._source)
              count += 1
            }
          });
        }

        this.filteredLyrics = this.retrievedLyrics;

        // aggregations
        if(res.aggregations.artist_filter !== undefined) {
          res.aggregations.artist_filter.buckets.forEach(element => {
            this.aggs_artist.push([element.key, element.doc_count])
          });
        }
        if(res.aggregations.lyric_filter !== undefined) {
          res.aggregations.lyric_filter.buckets.forEach(element => {
            this.aggs_lyric_wrt.push([element.key, element.doc_count])
          });
        }
        if(res.aggregations.genre_filter !== undefined) {
          res.aggregations.genre_filter.buckets.forEach(element => {
            this.aggs_genre.push([element.key, element.doc_count])
          });
        }

      },
      error: err => {
        this.search_pressed = false;
        this.error_present = true;
        this.retrievedLyrics = [],
        this.filteredLyrics = [];
        console.log(err)
      }
    });

  }


  advancedLyricSearch() {
    this.search_pressed = true;
    this.error_present = false;
    this.retrievedLyrics = [];
    this.filteredLyrics = [];
    this.aggs_artist = [];
    this.aggs_lyric_wrt = [];
    this.aggs_genre = [];

    let query = $('#adv_search_query').val();
    let artist = $('#artist').val();
    let lyricWriter = $('#writtenby').val();
    let musicBy = $('#musicby').val();
    let genre = $('#genre').val();
    let key = $('#key').val();
    let beat = $('#beat').val();

    $.ajax({
      type: "POST",
      url: "http://127.0.0.1:5002/advancedsearch",
      data: {
        query: query,
        size: this.result_boundary,
        language: this.lan_selected,
        artist: artist,
        lyric_writer: lyricWriter,
        music_by: musicBy,
        genre: genre,
        key: key,
        beat: beat
      },
      success: res => {
        console.log(res.hits.hits)
        console.log(res.aggregations)

        this.search_pressed = false;
        let count = 0;

        if(res.hits.hits.length == 0) {
          this.no_result = true;
        }

        res.hits.hits.forEach(element => {
          if(element._score > 100) {
            this.retrievedLyrics.push(element._source)
            count += 1
          }
        });

        if(this.retrievedLyrics.length == 0) {
          res.hits.hits.forEach(element => {
            if(element._score > 60) {
              this.retrievedLyrics.push(element._source)
              count += 1
            }
          });
        }
        if(this.retrievedLyrics.length == 0) {
          res.hits.hits.forEach(element => {
            if(element._score > 30) {
              this.retrievedLyrics.push(element._source)
              count += 1
            }
          });
        }
        if(this.retrievedLyrics.length == 0) {
          res.hits.hits.forEach(element => {
            if(element._score > 20) {
              this.retrievedLyrics.push(element._source)
              count += 1
            }
          });
        }
        if(this.retrievedLyrics.length == 0) {
          res.hits.hits.forEach(element => {
            if(element._score > 10) {
              this.retrievedLyrics.push(element._source)
              count += 1
            }
          });
        }
        if(this.retrievedLyrics.length == 0) {
          res.hits.hits.forEach(element => {
            if(element._score > 5) {
              this.retrievedLyrics.push(element._source)
              count += 1
            }
          });
        }
        if(this.retrievedLyrics.length == 0) {
          res.hits.hits.forEach(element => {
            if(count < this.result_boundary/2) {
              this.retrievedLyrics.push(element._source)
              count += 1
            }
          });
        }

        this.filteredLyrics = this.retrievedLyrics;

        // aggregations
        if(res.aggregations.artist_filter !== undefined) {
          res.aggregations.artist_filter.buckets.forEach(element => {
            this.aggs_artist.push([element.key, element.doc_count])
          });
        }
        if(res.aggregations.lyric_filter !== undefined) {
          res.aggregations.lyric_filter.buckets.forEach(element => {
            this.aggs_lyric_wrt.push([element.key, element.doc_count])
          });
        }
        if(res.aggregations.genre_filter !== undefined) {
          res.aggregations.genre_filter.buckets.forEach(element => {
            this.aggs_genre.push([element.key, element.doc_count])
          });
        }

      },
      error: err => {
        this.search_pressed = false;
        this.error_present = true;
        this.retrievedLyrics = [],
        this.filteredLyrics = [];
        console.log(err)
      }
    });

  }

  filterResults(type: string, filterTerm: string) {
    if (type == 'artist') {
      this.filteredLyrics  =this.retrievedLyrics.filter(element =>
        element.artist.indexOf(filterTerm) !== -1
      );
    } else if (type == 'lyric_wrt') {
      this.filteredLyrics  =this.retrievedLyrics.filter(element =>
        element.lyricWriter.indexOf(filterTerm) !== -1
      );
    } else if (type == 'genre') {
      this.filteredLyrics  =this.retrievedLyrics.filter(element =>
        element.genre.indexOf(filterTerm) !== -1
      );
    }

    if(this.filteredLyrics.length == 0) {
      this.no_result = true
    } else {
      this.no_result = false
    }
  }

}
