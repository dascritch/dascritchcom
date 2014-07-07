import io, json
from html.parser import HTMLParser

document = open('data/webdev.html', 'r')
listing = open('data/listing.json', 'w')

articles = {}

class ArticlesExtractor(HTMLParser):
    inmain = False
    articlePattern = { 'url' : '', 'title' : '', 'date' : '', 'img' : '', 'intro' : '' }
    article = {}
    lastTagStart = ''

    def handle_starttag(self, tag, attrs):
        if (self.inmain == False) and (tag == 'main') :
            self.inmain = True

        if (self.lastTagStart in ['h2','h3']) and (tag == 'a') :
            self.lastTagStart = 'title'
        else :
            self.lastTagStart = tag

        if (self.inmain) :
            print("Start tag:", tag)
            if (tag == 'article') :
                self.article = self.articlePattern

            for attr in attrs:
                print("     attr:", attr)
                if (tag == 'time') and (attr[0] == 'datetime') :
                    self.article['date'] = attr[1]

                if (tag == 'a') and (attr[0] == 'href') and ( attr[1].find('#') == -1 ) :
                    self.article['url'] = attr[1]

                if (tag == 'img') and (attr[0] == 'src') and ( attr[1].find('.blog2') != -1 ) :

                    # déclaration implicite du NDD
                    #if (attr[1].find('http') != 0) :
                    #    attr[1] =  'http://dascritch.net/' + attr[1]

                    self.article['img'] = attr[1]

    def handle_endtag(self, tag):
        if (self.inmain) and (tag == 'main') :
            self.inmain = False
        if (self.inmain) :
            print("End tag  :", tag)

        if (self.inmain) and (tag == 'article') :
            articles[ self.article['date'] ] = self.article.copy()
            

    def handle_data(self, data):
        if (self.inmain) :
            data = data.strip()
            print("Data     :", data)
            if (data != '') :
                if (self.lastTagStart == 'p') :
                    self.article['intro'] = data
                if (self.lastTagStart == 'title') :
                    self.article['title'] = data

parser = ArticlesExtractor()

for line in document :
    parser.feed(line)

json.dump(articles, listing, ensure_ascii=False)