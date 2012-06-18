$(document).ready(function(){

var datestringregex = /\/CreationDate \(D:\d+\)/
, replacementdatestring = '/CreationDate (D:0)'
, producerstringregex = /\/Producer\s+\(jsPDF\s+\d+\)/
, replacementproducerstring = '/Producer  (jsPDF 0)'
, removeMinorDiffs = function(t){
	t = t.replace(datestringregex, replacementdatestring)
	t = t.replace(producerstringregex, replacementproducerstring)
	return t.trim()
}
, testinventory = {
	"001_blankpdf.txt": function(){
		var doc = new jsPDF()
		return doc.output()
	}
	, "002_twopagedoc.txt":function(){
		var doc = new jsPDF()
		doc.text(20, 20, 'Hello world!')
		doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.')
		doc.addPage()
		doc.text(20, 20, 'Do you like that?')
		return doc.output()
	}
	, "003_demolandscape.txt":function(){
		var doc = new jsPDF('landscape')
		doc.text(20, 20, 'Hello landscape world!')
		return doc.output()
	}
	, "004_fontsizes.txt":function(){
		var doc = new jsPDF()
		doc.setFontSize(22)
		doc.text(20, 20, 'This is a title')
		
		doc.setFontSize(16)
		doc.text(20, 30, 'This is some normal sized text underneath.');	
		
		return doc.output()
	}
	, "005_demofonttypes.txt":function(){
		var doc = new jsPDF()
		
		doc.text(20, 20, 'This is the default font.')
		
		doc.setFont("courier")
		doc.setFontType("normal")
		doc.text(20, 30, 'This is courier normal.')
		
		doc.setFont("times")
		doc.setFontType("italic")
		doc.text(20, 40, 'This is times italic.')
		
		doc.setFont("helvetica")
		doc.setFontType("bold")
		doc.text(20, 50, 'This is helvetica bold.')
		
		doc.setFont("courier")
		doc.setFontType("bolditalic")
		doc.text(20, 60, 'This is courier bolditalic.')
		
		return doc.output()
	}
	, "006_demotestcolors.txt":function(){
		var doc = new jsPDF()

		doc.setTextColor(100)
		doc.text(20, 20, 'This is gray.')
		
		doc.setTextColor(150)
		doc.text(20, 30, 'This is light gray.')	
		
		doc.setTextColor(255,0,0)
		doc.text(20, 40, 'This is red.')
		
		doc.setTextColor(0,255,0)
		doc.text(20, 50, 'This is green.')
		
		doc.setTextColor(0,0,255)
		doc.text(20, 60, 'This is blue.')
		
		return doc.output()
	}
	, "007_demometadata.txt":function(){
		var doc = new jsPDF()
		doc.text(20, 20, 'This PDF has a title, subject, author, keywords and a creator.')
		
		// Optional - set properties on the document
		doc.setProperties({
			title: 'Title',
			subject: 'This is the subject',		
			author: 'James Hall',
			keywords: 'generated, javascript, web 2.0, ajax',
			creator: 'MEEE'
		})
		
		return doc.output()
	}
	, "008_demorectangles.txt":function(){
		var doc = new jsPDF()

		doc.rect(20, 20, 10, 10); // empty square

		doc.rect(40, 20, 10, 10, 'F') // filled square
		
		doc.setDrawColor(255,0,0)
		doc.rect(60, 20, 10, 10); // empty red square
		
		doc.setDrawColor(255,0,0)
		doc.rect(80, 20, 10, 10, 'FD') // filled square with red borders
		
		doc.setDrawColor(0)
		doc.setFillColor(255,0,0)
		doc.rect(100, 20, 10, 10, 'F') // filled red square
		
		doc.setDrawColor(0)
		doc.setFillColor(255,0,0)
		doc.rect(120, 20, 10, 10, 'FD') // filled red square with black borders
		
		return doc.output()
	}
	, "009_demoliness.txt":function(){
		var doc = new jsPDF()

		doc.line(20, 20, 60, 20) // horizontal line
		
		doc.setLineWidth(0.5)
		doc.line(20, 25, 60, 25)
		
		doc.setLineWidth(1)
		doc.line(20, 30, 60, 30)
		
		doc.setLineWidth(1.5)
		doc.line(20, 35, 60, 35)
		
		doc.setDrawColor(255,0,0) // draw red lines
		
		doc.setLineWidth(0.1)
		doc.line(100, 20, 100, 60) // vertical line
		
		doc.setLineWidth(0.5)
		doc.line(105, 20, 105, 60)
		
		doc.setLineWidth(1)
		doc.line(110, 20, 110, 60)
		
		doc.setLineWidth(1.5)
		doc.line(115, 20, 115, 60)

		return doc.output()
	}
	, "010_democircles.txt":function(){
		var doc = new jsPDF()

		doc.ellipse(40, 20, 10, 5)

		doc.setFillColor(0,0,255)
		doc.ellipse(80, 20, 10, 5, 'F')
		
		doc.setLineWidth(1)
		doc.setDrawColor(0)
		doc.setFillColor(255,0,0)
		doc.circle(120, 20, 5, 'FD')
		
		return doc.output()
	}
	, "011_multilinetext.txt":function(){
		var doc = new jsPDF()
		, text = [
		    'This is line one'
		    , 'This is line two'
		    , 'This is line three'
		    , 'This is line four'
		    , 'This is line five'
        ]
		doc.text(20, 20, text)
		return doc.output()
	}
	, "012_multiplelines.txt":function(){
		var doc = new jsPDF()
		, x1 = 40
		, y1 = 40
		, lines = [
            [10,10]
            , [-20,10]
            , [-15,5,-20,10,-30,15]
        ]
		
		doc.lines(x1, y1, lines)
		doc.lines(x1, y1, lines, [-1, -1])
		doc.lines(x1, y1, lines, [0.5, -0.5])
		doc.lines(x1, y1, lines, [-2, 2])
		return doc.output()
	}
}
, testrunner = function(reference_file_name, test_data_yielder){
	asyncTest(reference_file_name, function() {
		//QUnit.stop()
		require(['text!'+reference_file_name])
		.then(function(expectedtext){					
			QUnit.expect(1)
			QUnit.equal(
				removeMinorDiffs( test_data_yielder() )
				, removeMinorDiffs( expectedtext )
			)
			QUnit.start()
			//stop()
		})
	})
}

for (var filename in testinventory){
	if (testinventory.hasOwnProperty(filename)){
		testrunner(
			filename
			, testinventory[filename]
		)
	}
}

}) // end of document.ready(