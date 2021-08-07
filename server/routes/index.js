const dbconfig = require('../dbConfig');
const oracledb = require('oracledb');
oracledb.autoCommit = true;
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.send({ greeting: 'Hello React X Node.Js' });
});

// SearchContent에서 도서 목록 반환
router.get('/ebook', function(req, res) {
	const query = `
		SELECT B.*, A.AUTHOR
		FROM EBOOK B, AUTHORS A
		WHERE B.ISBN = A.ISBN
	`;
	oracledb.getConnection(dbconfig,
    function(err, connection) {
			if (err) {
				console.error(err.message);
				return;
    	}
			connection.execute(query, [], function(err, result) {
				if (err) {
					console.error(err.message);
					return;
				}
				res.send(result.rows);
    	});
		}
	);
});

// Login Page에서 로그인
router.post('/login', function(req, res) {
	const id = req.body.data.id;
	const pw = req.body.data.password;
	const query = `SELECT CNO, NAME FROM CUSTOMER WHERE NAME='${id}' AND PASSWD='${pw}'`;
	oracledb.getConnection(dbconfig,
    function(err, connection) {
			if (err) {
				console.error(err.message);
				return;
    	}
			connection.execute(query, [], function(err, result) {
				if (err) {
					console.error(err.message);
					return;
				}
				res.send(result.rows);
    	});
		}
	);
});

// SearchContent에서 검색 기능
router.post('/search', function(req, res) {
	let bookTitle = req.body.data.bookTitle;
	let author = req.body.data.author;
	let publisher = req.body.data.publisher;
	let year = req.body.data.year;

	let query;

	if(!bookTitle) bookTitle = '';
	if(!author) author = ''; 
	if(!publisher) publisher = ''; 
	if(!year) year = null; 
	query = `
		SELECT B.*, A.AUTHOR
		FROM EBOOK B, AUTHORS A
		WHERE 
		(B.TITLE LIKE '%${bookTitle}%'
		OR A.AUTHOR LIKE '%${author}%'
		OR B.PUBLISHER LIKE '%${publisher}%'
		OR B.YEAR LIKE '%${year}%')
		AND
		(B.ISBN = A.ISBN)
		`;

	oracledb.getConnection(dbconfig,
    function(err, connection) {
			console.log(query);
			if (err) {
				console.error(err.message);
				return;
    	}
			connection.execute(query, [], function(err, result) {
				if (err) {
					console.error(err.message);
					return;
				}
				res.send(result.rows);
    	});
		}
	);
});

// SearchBook에서 도서를 대출
router.post('/rent', function(req, res) {
	const dateRented = req.body.data.dateRented;
	const dateDue = req.body.data.dateDue;
	const cno = req.body.data.cno;
	const isbn = req.body.data.isbn;
	
	const ebookTableQuery = `
		UPDATE EBOOK
		SET DATERENTED='${dateRented}', DATEDUE='${dateDue}', CNO='${cno}', EXTTIMES='0'
		WHERE ISBN='${isbn}'
	`;

	const previousTableQuery = `
		INSERT INTO PREVIOUSRENTAL
		VALUES ('${isbn}', '${dateRented}', '0', '${cno}')
	`;

	oracledb.getConnection(dbconfig,
    function(err, connection) {
			if (err) {
				console.error(err.message);
				return;
    	}
			connection.execute(previousTableQuery, [], function(err, result) {
				if (err) {
					console.error(err.message);
					return;
				}
    	});
			connection.execute(ebookTableQuery, [], function(err, result) {
				if (err) {
					console.error(err.message);
					return;
				}
				res.send(result);
    	});
		}
	);
});

// SearchBook에서 도서를 예약
router.post('/reserve', function(req, res) {
	const dateTime = req.body.data.dateTime;
	const cno = req.body.data.cno;
	const isbn = req.body.data.isbn;
	
	const reserveTableQuery = `
		INSERT INTO RESERVE
		VALUES ('${isbn}', '${cno}', '${dateTime}')
	`;

	oracledb.getConnection(dbconfig,
    function(err, connection) {
			if (err) {
				console.error(err.message);
				return;
    	}
			connection.execute(reserveTableQuery, [], function(err, result) {
				if (err) {
					console.error(err.message);
					return;
				}
				res.send(result);
    	});
		}
	);
});

// RentBook에서 예약 기록을 반환
router.get('/isThereReserve', function(req, res) {
	const reserveTableQuery = `
		SELECT * FROM RESERVE
	`;

	oracledb.getConnection(dbconfig,
    function(err, connection) {
			if (err) {
				console.error(err.message);
				return;
    	}
			connection.execute(reserveTableQuery, [], function(err, result) {
				if (err) {
					console.error(err.message);
					return;
				}
				res.send(result.rows);
    	});
		}
	);
});

// SearchBook + SearchContent에서 회원의 예약한 도서 조회목록 반환 
router.post('/getReserve', function(req, res) {
	const cno = req.body.data.cno;
	const query = `
		SELECT * FROM RESERVE R
		WHERE R.CNO='${cno}'
	`;

	oracledb.getConnection(dbconfig,
    function(err, connection) {
			if (err) {
				console.error(err.message);
				return;
    	}
			connection.execute(query, [], function(err, result) {
				if (err) {
					console.error(err.message);
					return;
				}
				res.send(result.rows);
    	});
		}
	);
});

// SearchBook에서 회원의 대출한 도서 조회목록 반환
router.post('/getRent', function(req, res) {
	const cno = req.body.data.cno;
	const query = `
		SELECT * FROM PREVIOUSRENTAL P
		WHERE (P.CNO='${cno}') AND (P.DATERETURNED='0')
	`;

	oracledb.getConnection(dbconfig,
    function(err, connection) {
			if (err) {
				console.error(err.message);
				return;
    	}
			connection.execute(query, [], function(err, result) {
				if (err) {
					console.error(err.message);
					return;
				}
				res.send(result.rows);
    	});
		}
	);
});

// ReverseContent에서 회원의 예약 기록의 도서 반환
router.post('/reserveByCno', function(req, res) {
	const cno = req.body.data.cno;
	const query = `
		SELECT E.*, A.AUTHOR
		FROM RESERVE R, EBOOK E, AUTHORS A
		WHERE (R.ISBN = E.ISBN) AND (A.ISBN = E.ISBN) AND (R.CNO ='${cno}')
	`;

	oracledb.getConnection(dbconfig,
    function(err, connection) {
			if (err) {
				console.error(err.message);
				return;
    	}
			connection.execute(query, [], function(err, result) {
				if (err) {
					console.error(err.message);
					return;
				}
				res.send(result.rows);
    	});
		}
	);
});

// RentContent에서 회원의 대출 기록의 도서 반환
router.post('/previousRentalByCno', function(req, res) {
	const cno = req.body.data.cno;
	const query = `
		SELECT E.*, A.AUTHOR 
		FROM EBOOK E, AUTHORS A
		WHERE (E.CNO ='${cno}') and (A.ISBN = E.ISBN)
	`;

	oracledb.getConnection(dbconfig,
    function(err, connection) {
			if (err) {
				console.error(err.message);
				return;
    	}
			connection.execute(query, [], function(err, result) {
				if (err) {
					console.error(err.message);
					return;
				}
				res.send(result.rows);
    	});
		}
	);
});

// RentBook에서 도서를 반환
router.post('/return', function(req, res) {
	const dateReturned = req.body.data.dateReturned;
	const cno = req.body.data.cno;
	const isbn = req.body.data.isbn;
	
	const ebookTableQuery = `
		UPDATE EBOOK
		SET DATERENTED='', DATEDUE='', CNO='', EXTTIMES='0'
		WHERE ISBN='${isbn}'
	`;

	const previous1TableQuery = `
		INSERT INTO PREVIOUSRENTAL
		(isbn, cno, daterented, datereturned)
		select isbn, cno, daterented, ${dateReturned} 
		from PREVIOUSRENTAL P
		WHERE (P.ISBN='${isbn}') AND (P.CNO='${cno}') AND (P.DATERETURNED='0')
	`;
	
	const previous2TableQuery = `
		DELETE FROM PREVIOUSRENTAL P
		WHERE (P.ISBN='${isbn}') AND (P.CNO='${cno}') AND (P.DATERETURNED='0')
	`;
	
	oracledb.getConnection(dbconfig,
    function(err, connection) {
			if (err) {
				console.error(err.message);
				return;
    	}
			connection.execute(previous1TableQuery, [], function(err, result) {
				if (err) {
					console.error(err.message);
					return;
				}
    	});
			connection.execute(previous2TableQuery, [], function(err, result) {
				if (err) {
					console.error(err.message);
					return;
				}
		});
			connection.execute(ebookTableQuery, [], function(err, result) {
				if (err) {
					console.error(err.message);
					return;
				}
				res.send(result);
    	});
		}
	);
});



// RentBook에서 도서의 예약을 연장
router.post('/extendtime', function(req, res) {
	const isbn = req.body.data.isbn;
	const extendDate = req.body.data.extendDate;
	const extendTimes = req.body.data.extendTimes + 1;
	
	console.log(isbn, extendDate, extendTimes);

	const reserveTableQuery = `
		UPDATE EBOOK
		SET extTimes='${extendTimes}', dateDue='${extendDate}'
		WHERE ISBN='${isbn}'
	`;

	oracledb.getConnection(dbconfig,
    function(err, connection) {
			if (err) {
				console.error(err.message);
				return;
    	}
			connection.execute(reserveTableQuery, [], function(err, result) {
				if (err) {
					console.error(err.message);
					return;
				}
				res.send(result);
    	});
		}
	);
});


// ReserveBook에서 도서 예약 취소
router.post('/reserveCancel', function(req, res) {
	const cno = req.body.data.cno;
	const isbn = req.body.data.isbn;
	
	const reserveTableQuery = `
		DELETE from RESERVE
		WHERE (CNO='${cno}') AND (ISBN='${isbn}')
	`;

	oracledb.getConnection(dbconfig,
    function(err, connection) {
			if (err) {
				console.error(err.message);
				return;
    	}
			connection.execute(reserveTableQuery, [], function(err, result) {
				if (err) {
					console.error(err.message);
					return;
				}
				res.send(result);
    	});
		}
	);
});

router.get('/func1', function(req, res) {
	const query = `
		select e.isbn, e.title, e.publisher, p.daterented, p.cno
		from ebook e, previousRental p
		where p.isbn = e.isbn
		order by p.daterented desc
	`;
	oracledb.getConnection(dbconfig,
    function(err, connection) {
			if (err) {
				console.error(err.message);
				return;
    	}
			connection.execute(query, [], function(err, result) {
				if (err) {
					console.error(err.message);
					return;
				}
				res.send(result.rows);
    	});
		}
	);
});

router.get('/func2', function(req, res) {
	const query = `
		select a.author, count(*)
		from ebook e, previousRental p, authors a
		where p.isbn = e.isbn and e.isbn = a.isbn
		group by a.author
	`;
	oracledb.getConnection(dbconfig,
    function(err, connection) {
			if (err) {
				console.error(err.message);
				return;
    	}
			connection.execute(query, [], function(err, result) {
				if (err) {
					console.error(err.message);
					return;
				}
				res.send(result.rows);
    	});
		}
	);
});

router.get('/func3', function(req, res) {
	const query = `
		select c.cno, avg(exttimes), count(*)
		from ebook e, previousRental p, customer c
		where p.isbn=e.isbn and e.cno=c.cno
		group by c.cno
	`;
	oracledb.getConnection(dbconfig,
    function(err, connection) {
			if (err) {
				console.error(err.message);
				return;
    	}
			connection.execute(query, [], function(err, result) {
				if (err) {
					console.error(err.message);
					return;
				}
				res.send(result.rows);
    	});
		}
	);
});

module.exports = router;
