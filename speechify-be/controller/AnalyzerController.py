from flask import Blueprint, request, jsonify
from service.AnalyzerService import Analyzer
analyzer_controller = Blueprint("analyzer_controller", __name__ )

ANALYZER_API_BASE_URL = '/api/v1/analyzer/'

analyzer_service = Analyzer()

@analyzer_controller.route( ANALYZER_API_BASE_URL + '/get-grammar-score', methods =['GET'])
def getGrammarScore():
    return analyzer_service.get_grammar_score()

@analyzer_controller.route(ANALYZER_API_BASE_URL + "get-complexity-score", methods = ['GET'])
def getComplexityScore():
    return analyzer_service.get_complexity_score()

@analyzer_controller.route(ANALYZER_API_BASE_URL + "get-clarity-score", methods=['GET'])
def getClarityScore():
    return analyzer_service.get_clarity_score()

@analyzer_controller.route(ANALYZER_API_BASE_URL + "get-score", methods = ['GET'])
def getScore():
    return analyzer_service.get_scores()

@analyzer_controller.route(ANALYZER_API_BASE_URL + "relevance-score", methods = ['GET'])
def getRelevanceScore():
    return analyzer_service.get_relevance_score()