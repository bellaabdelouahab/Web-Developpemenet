 <template>
    <div>
        <button id="subbutton" @click="Start">Start</button>
        <h1>{{Qstns[index].question}}</h1>
        <button v-for="(value,v_index) in Qstns[index].incorrect_answers" class="answer" v-bind:key="value" @click="checkanswer(index,v_index)">{{value}}</button>
    </div>
    <!-- <input type="text" id="inputarea" placeholder="here" @input="inputExpected=$event.target.value"> -->
    
</template>
<script> 
export default {
    data : ()=> ({
        Qstns: [{}],
        index: 0,
        inputExpected: "input"
    }) ,
    methods : {
        Start() {
            fetch("https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple")
            .then(response => {response.json().then(data => {
                this.Qstns = data.results;
                for (let i = 0; i < this.Qstns.length; i++) {
                    this.Qstns[i].incorrect_answers.push(this.Qstns[i].correct_answer);
                }
                console.log(this.Qstns);
                });
            })
        },
        Addtag(event){
            this.tags.push(this.inputExpected);
            this.inputdefult = this.inputExpected;
            $("input").val(""); 
        },
        predict(event){
            this.inputExpected = event.target.value;
            // else if(event.keyCode == 9){ 
            //     event.preventDefault();
            //     if(event.target.value.length < this.inputdefult.length){
            //     event.target.value = this.inputdefult;
            //     }
            // }
        },
        inc(e){
            e.classList.remove("correct","no-hover");
            this.index = this.index + 1;
            if (this.index>=this.Qstns.length){
                this.index = 0;
                alert("congratulation");
            }
        },
        reseter(e){
            this.index = 0;
            e.classList.remove("incorrect","no-hover");
        },
        checkanswer(index,v_index){
            if(this.Qstns[index].incorrect_answers[v_index] == this.Qstns[index].correct_answer){
                event.target.classList.add("correct","no-hover");
                setTimeout(this.inc, 2000,event.target);
            }
            else{
                event.target.classList.add("incorrect","no-hover");
                // console.log(event.target.classList)
                setTimeout(this.reseter, 2000,event.target);
            }
        },
        
    }
}
</script>

<style scoped>
    div,.answer{
        display:grid;
        place-items: center;
        border: 1px solid black;
        border-radius: 10px;
        padding: 10px;
        margin: 10px;
    }
    .answer{
        width: 95%;
    }
    .answer:not(.no-hover):hover {
        background-color: #e4cc46;
    }
    input{
        border: 1px solid black;
        border-right: 0px solid black;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        padding: 10px;
    }
    #subbutton{
        border: 1px solid black;
        border-radius: 10px;
        /* border-top-right-radius: 10px;
        border-bottom-right-radius: 10px; */
        padding: 10px;
        padding-left: 50px;
        padding-right: 50px;
    }
    .correct{
        background-color: #3bf23b;
    }
    .incorrect{
        background-color: #f23b3b;
    }
</style>