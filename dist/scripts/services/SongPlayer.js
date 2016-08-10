(function(){
    function SongPlayer(Fixtures) {
        var SongPlayer = {};
        
        /**
         * @desc Info for current album
         * @type {Object}
         */
        
        var currentAlbum = Fixtures.getAlbum();
        
        /**
         * @desc Buzz object audio file
         * @type {Object}
         */
        var currentBuzzObject = null;
        
         /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
        var setSong = function(song){
            if(currentBuzzObject) {
                stopSong(SongPlayer.currentSong);
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            SongPlayer.currentSong = song;
        }
        
        /**
         * @desc Get index of song in the songs array
         * @param {Object} song
         * @returns {Number}
         */
        
        var getSongIndex = function(song){
            return currentAlbum.songs.indexOf(song);
        }
        
        /**
         * @desc Active song object from list of songs
         * @type {Ojbect}
         */
        
        SongPlayer.currentSong = null;
        
        /**
         * @function playSong
         * @desc Play the current song currentBuzzObject and set the song playing to true
         * @param {Object} song
         */
        
        var playSong = function(song){
            currentBuzzObject.play();
            song.playing = true;
        }
        
        var stopSong = function(song){
            currentBuzzObject.stop();
            song.playing = null;
        }
        
        SongPlayer.play = function(song){
            song = song || SongPlayer.currentSong;
            
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
                
            } else if (SongPlayer.currentSong === song){
                if (currentBuzzObject.isPaused()){
                    playSong(song);
                }
            }
        };
        
        SongPlayer.pause = function(song){
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        /**
         * @function previous
         * @desc Play the previous song in album
         */
        
        SongPlayer.previous = function(){
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0){
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        /**
         * @function next
         * @desc Play next song in album
         */
        
        SongPlayer.next = function(){
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            if (currentSongIndex >= currentAlbum.songs.length){
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer)
})();