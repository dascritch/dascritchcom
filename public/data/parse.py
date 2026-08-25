import io, json
from html.parser import HTMLParser
from collections import OrderedDict

listing = open('data/listing.json', 'w')

articles = {}

class ArticlesExtractor(HTMLParser):
    inmain = False
    intitle = False
    inintro = False
    intro = '';
    articlePattern = { 
        'url' : '',
        'title' : '',
        'img' : '',
        'intro' : ''
    }
    article = {}
    lastTagStart = ''
    date = '0'

    def handle_starttag(self, tag, attrs):
        if (self.inmain == False) and (tag == 'main') :
            self.inmain = True

        self.intitle = False
        if (self.lastTagStart in ['h2','h3']) :
            self.intitle = True

        self.lastTagStart = tag

        if (self.inmain) :
            if (tag == 'article') :
                self.article = self.articlePattern

            for attr in attrs:
                if (tag == 'time') and (attr[0] == 'datetime') :
                    self.date = attr[1]

                if (tag == 'a') and (attr[0] == 'href') and ( attr[1].find('#') == -1 ) :
                    self.article['url'] = attr[1]

                if (tag == 'a') and (attr[0] == 'class') and ( attr[1] == 'post-summary' ) :
                    self.inintro = True

                if (tag == 'img') and (attr[0] == 'src') and ( attr[1].find('.blog2') != -1 ) :
                    self.article['img'] = attr[1]


    def handle_endtag(self, tag):
        if (self.inmain) and (tag == 'main') :
            self.inmain = False

        if (tag == 'a') :
            self.inintro = False

        if (self.inmain) and (tag == 'article') :
            self.article['intro'] = self.intro
            articles[ self.date ] = self.article.copy()
            print(self.date +' : '+ self.article['title'])
            self.article = self.articlePattern
            self.intro = '';

    def handle_data(self, data):
        if (self.inmain) :
            data = data.strip()

            if (data != '') :
                if (self.inintro) :
                    self.intro += data

                if (self.intitle) :
                    self.article['title'] = data

    def handle_entityref(self,name) :
        if (self.inintro) :
                self.intro += '&'+name+';'

for theme in ['webdev','self-business'] :
    document = open('data/'+theme+'.html', 'r')

    parser = ArticlesExtractor()
    for line in document :
        parser.feed(line)

articles_ordered = OrderedDict([(k, articles[k]) for k in reversed(sorted(articles.keys())[-9:])])

json.dump(articles_ordered, listing, ensure_ascii=False)
