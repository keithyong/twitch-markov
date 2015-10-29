var fs = require('fs');
var FINAL_STATE = 'FINAL_STATE';
var FINAL_STATE_SPACED = ' ' + FINAL_STATE + ' ';
var transitions = {};
var terminators_regex = ['\n', ';', '\\?', '!']

// Format the file, replacing terminators with FINAL_STATE_SPACED
// and splitting on whitespace
function load_and_format_file(filename) {
    // File generated by
    // awk -F'\t' '/^[0-9]+\s/ {print $3}' < bulldog_chat > bd_chat.txt
    var file = fs.readFileSync(filename).toString();

    for (var i = 0; i < terminators_regex.length; i++) {
        file = file.replace(new RegExp(terminators_regex[i], 'g'), FINAL_STATE_SPACED);
    }

    return file.split(/\s/);
}

function build_transitions(words) {
    var transitions = {};
    var curr_word = '';
    var next_word = '';
    var len = words.length;

    for (var i =  0; i < len - 1; i++) {
        curr_word = words[i];
        next_word = words[i + 1];

        if (curr_word !== FINAL_STATE) {
            if (transitions[curr_word] === undefined) {
                transitions[curr_word] = [next_word];
            } else {
                transitions[curr_word].push(next_word);
            }
        }
    }

    return transitions;
}

function grab_random_element(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generate_sentence() {
    var all_words = Object.keys(this.transitions);
    var sentence = '';
    var curr_word = grab_random_element(all_words);
    sentence += curr_word;

    for (var next_word = '', num_words = 0; next_word !== FINAL_STATE;) {
        next_word = grab_random_element(this.transitions[curr_word]);
        curr_word = next_word;
        if (next_word !== FINAL_STATE)
            sentence += ' ' + next_word;
        num_words++;
    }

    return sentence;
}

module.exports = function init(filename) {
    this.transitions =  build_transitions(load_and_format_file(filename));

    return generate_sentence.bind(this);
}
